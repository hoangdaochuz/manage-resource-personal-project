import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchSiteDTO } from './dto/search-site.dto';
import { Prisma } from '@prisma/client';
import { CreateSiteDTO } from './dto/create-site.dto';

@Injectable()
export class SiteService {
  constructor(private readonly prismaService: PrismaService) {}
  getAllSiteService() {
    return this.prismaService.site.findMany();
  }

  getSitebyIdService(id: number) {
    return this.prismaService.site.findUnique({
      where: {
        id,
      },
    });
  }
  getSitesByOwnerService(ownerId: number) {
    return this.prismaService.site.findMany({
      where: {
        owner: ownerId,
      },
    });
  }

  async findSitesByCriteriaService(
    searchSiteDto: SearchSiteDTO,
    limit: number,
    offset: number,
  ) {
    const { id, name, owner } = searchSiteDto;
    const idQuery = id ? { id: id } : {};
    const nameQuery = name ? { name } : {};
    const ownerQuery = owner ? { owner } : {};

    const query: Prisma.SiteFindManyArgs = {
      where: {
        ...idQuery,
        ...nameQuery,
        ...ownerQuery,
      },
      take: limit,
      skip: offset,
    };

    const [sites, count] = await this.prismaService.$transaction([
      this.prismaService.site.findMany(query),
      this.prismaService.site.count({ where: query.where }),
    ]);
    return {
      sites,
      total: count,
      isLast: offset + sites.length >= count,
    };
  }
  createSiteService(createSiteDTO: CreateSiteDTO) {
    return this.prismaService.site.create({
      data: createSiteDTO,
    });
  }

  updateSiteService(id: number, name: string) {
    return this.prismaService.site.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }
  deleteSiteService(id: number) {
    return this.prismaService.site.delete({
      where: { id },
    });
  }
}
