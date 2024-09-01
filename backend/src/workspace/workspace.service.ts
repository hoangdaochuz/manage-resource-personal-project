import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchWorkspaceDto } from './dto/search-workspace.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Prisma } from '@prisma/client';
import { ReorderWorkspaceDto } from './dto/reorder-workspace.dto';
import { replaceListItem } from './helper';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}
  //CRUD

  // [GET]  get all workspace
  getAllWorkspace() {
    return this.prisma.workspace.findMany({
      include: {
        projects: true,
        teams: true,
      },
    });
  }

  // [GET] get workspace by id
  getWorkspaceById(id: number) {
    return this.prisma.workspace.findUniqueOrThrow({
      where: { id },
      include: { projects: true, teams: true },
    });
  }

  // [GET] get my workspace
  getMyWorkspaces(userId: number) {
    return this.prisma.workspace.findMany({
      where: { owner: userId },
      include: { projects: true },
      orderBy: {
        order: 'asc',
      },
    });
  }
  // [POST] search workspace
  async searchWorkspace(searchWorkspaceDto: SearchWorkspaceDto) {
    const { limit, offset, query } = searchWorkspaceDto;
    const commonQuery: Prisma.WorkspaceWhereInput = {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    };
    const [result, total] = await this.prisma.$transaction([
      this.prisma.workspace.findMany({
        where: commonQuery,
        include: {
          projects: true,
          teams: true,
        },
        take: limit,
        skip: offset,
      }),
      this.prisma.workspace.count({ where: commonQuery }),
    ]);
    return {
      limit,
      offset,
      data: result,
      total,
      isLast: limit + offset >= total,
    };
  }

  async reorderWorkspace(reorderWorkspaceDto: ReorderWorkspaceDto) {
    const { item, items, newRank } = reorderWorkspaceDto;
    const toDown = item.order < newRank;
    item.order = newRank;

    await this.prisma.workspace.update({
      where: {
        id: item.id,
      },
      data: item,
    });

    const _items = items.filter((i) => i.id !== item.id);
    let newArray = [];
    for (const it of _items) {
      if (it.order >= newRank - 2 && it.order <= newRank + 2) {
        newArray = replaceListItem(_items, newRank, toDown);
      }
      continue;
    }
    const updateOrderPromise = newArray.map((it) => {
      return this.prisma.workspace.update({
        where: {
          id: it.id,
        },
        data: it,
      });
    });
    await Promise.all(updateOrderPromise);
  }

  // [POST] create workspace
  createWorkspace(createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({ data: createWorkspaceDto });
  }

  //[PATCH] update workspace
  updateWorkspace(id: number, updateWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: { id },
      data: updateWorkspaceDto,
    });
  }
  // [DELETE] delete workspace
  async deleteWorkspace(id: number) {
    await this.prisma.project.deleteMany({ where: { workspaceId: id } });
    return this.prisma.workspace.delete({ where: { id } });
  }
}
