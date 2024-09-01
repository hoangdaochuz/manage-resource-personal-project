/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { searchProjectDto } from './dto/search-project.dto';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { ReorderProjectDTO } from './dto/reorder-project.dto';

@Controller('api/v1/project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  @UseGuards(AccessTokenGuard)
  getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @Get(':id')
  // @ApiOkResponse({ type: ProjectEntity })
  @UseGuards(AccessTokenGuard)
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProjectById(id);
  }

  @Post('search')
  @ApiOkResponse({ type: ProjectEntity, isArray: true })
  @UseGuards(AccessTokenGuard)
  searchProjects(@Body() searchProjectDto: searchProjectDto) {
    return this.projectService.searchProjects(searchProjectDto);
  }

  @Post()
  @ApiCreatedResponse({ type: ProjectEntity })
  @UseGuards(AccessTokenGuard)
  addProject(@Body() createProjectDto: createProjectDto) {
    return this.projectService.addProject(createProjectDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProjectEntity })
  @UseGuards(AccessTokenGuard)
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: updateProjectDto,
  ) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @ApiOkResponse({ type: ProjectEntity })
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }
  @Post('reorder')
  @UseGuards(AccessTokenGuard)
  reorderProjectOfWorkspace(@Body() reorderProjectDto: ReorderProjectDTO) {
    return this.projectService.reorderProject(reorderProjectDto);
  }
}
