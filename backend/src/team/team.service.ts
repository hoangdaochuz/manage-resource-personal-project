import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchTeamDto } from './dto/search-team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}
  // CRUD
  // [GET]  get all team
  getAllTeam() {
    return this.prisma.team.findMany();
  }

  // [GET] get team by id
  getTeamById(id: number) {
    return this.prisma.team.findUniqueOrThrow({ where: { id } });
  }

  // [GET] get team paginate
  async getTeamsPaginate(query: any) {
    const { limit, offset } = query;
    const _limit = parseInt(limit);
    const _offset = parseInt(offset);
    const total = await this.prisma.team.count();
    const result = await this.prisma.team.findMany({
      take: _limit,
      skip: _offset,
    });

    return {
      limit: _limit,
      offset: _offset,
      data: result,
      total,
      isLastPage: _offset + _limit >= total,
    };
  }

  // [POST] search team paginated
  async searchTeam(searchTeamDto: SearchTeamDto) {
    const { limit, offset, query } = searchTeamDto;
    const commonQuery: Prisma.TeamWhereInput = {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    };
    const [result, total] = await this.prisma.$transaction([
      this.prisma.team.findMany({
        where: commonQuery,
        take: limit,
        skip: offset,
      }),
      this.prisma.team.count({
        where: commonQuery,
      }),
    ]);

    return {
      limit,
      offset,
      data: result,
      total,
      isLast: offset + limit >= total,
    };
  }
  // [POST]: add 1 team
  createNewTeam(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({ data: createTeamDto });
  }

  // [PATCH]: update 1 team
  updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({ where: { id }, data: updateTeamDto });
  }

  // [DELETE]: delete 1 team
  deleteTeam(id: number) {
    return this.prisma.team.delete({ where: { id } });
  }
}
