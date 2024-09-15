import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SiteService } from './site.service';
import { SearchSiteDTO } from './dto/search-site.dto';
import { CreateSiteDTO } from './dto/create-site.dto';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { SiteEntity } from './entities/site.eintity';

@Controller('api/v1/site')
@ApiTags('Site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  @Get()
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity, isArray: true })
  getAllSite() {
    return this.siteService.getAllSiteService();
  }

  @Get('/id/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity })
  getSiteById(@Param('id', ParseIntPipe) id: number) {
    return this.siteService.getSitebyIdService(id);
  }
  @Get('/owner/:ownerId')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity })
  getSitesByOwner(@Param('ownerId', ParseIntPipe) ownerId: number) {
    return this.siteService.getSitesByOwnerService(ownerId);
  }
  @Post('/search')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity, isArray: true })
  findSitesByCriteria(
    @Body() searchSiteDto: SearchSiteDTO,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.siteService.findSitesByCriteriaService(
      searchSiteDto,
      limit,
      offset,
    );
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  @ApiCreatedResponse({ type: SiteEntity })
  createSite(@Body() createSiteDTO: CreateSiteDTO) {
    return this.siteService.createSiteService(createSiteDTO);
  }

  @Put('/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity })
  updateSite(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.siteService.updateSiteService(id, name);
  }

  @Delete('/:id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: SiteEntity })
  deleteSite(@Param('id', ParseIntPipe) id: number) {
    return this.siteService.deleteSiteService(id);
  }
}
