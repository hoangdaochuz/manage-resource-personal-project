import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { searchProjectDto } from './dto/search-project.dto';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { ReorderProjectDTO } from './dto/reorder-project.dto';
import { replaceListItem } from './helper';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  // CRUD
  // [GET]: get all projects
  getAllProjects() {
    return this.prisma.project.findMany();
  }

  // [GET]: get project by id
  getProjectById(id: number) {
    return this.prisma.project.findUniqueOrThrow({ where: { id } });
  }

  // [POST]: search project paginated
  searchProjects(searchProjectDto: searchProjectDto) {
    const { limit, offset, query } = searchProjectDto;
    return this.prisma.project.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      take: limit,
      skip: offset,
    });
  }

  // [POST]: add 1 project
  addProject(createProjectDto: createProjectDto) {
    return this.prisma.project.create({ data: createProjectDto });
  }

  // [PATCH]: update 1 project
  updateProject(id: number, updateProjectDto: updateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  // [DELETE]: delete 1 project
  deleteProject(id: number) {
    return this.prisma.project.delete({ where: { id } });
    // xoa luon project id o trong workspace
  }
  //[POST]: reorder project
  async reorderProject(reorderProjectDto: ReorderProjectDTO) {
    const { item, items, newRank } = reorderProjectDto;
    const toDown = item.order < newRank;
    item.order = newRank;

    await this.prisma.project.update({
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
      return this.prisma.project.update({
        where: {
          id: it.id,
        },
        data: it,
      });
    });
    await Promise.all(updateOrderPromise);
  }
}
