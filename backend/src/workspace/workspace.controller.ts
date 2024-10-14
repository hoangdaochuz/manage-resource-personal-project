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
import { WorkspaceService } from './workspace.service';
import { SearchWorkspaceDto } from './dto/search-workspace.dto';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WorkspaceEntity } from './entities/workspace.entity';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { ReorderWorkspaceDto } from './dto/reorder-workspace.dto';

@Controller('api/v1/workspace')
@ApiTags('Workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @ApiOkResponse({ type: WorkspaceEntity, isArray: true })
  @UseGuards(AccessTokenGuard)
  getAllWorkspace() {
    return this.workspaceService.getAllWorkspace();
  }

  @Get(':id')
  @ApiOkResponse({ type: WorkspaceEntity })
  @UseGuards(AccessTokenGuard)
  getWorkspaceById(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.getWorkspaceById(id);
  }

  @Get('owner/:userId/site/:siteId')
  @ApiResponse({ type: WorkspaceEntity })
  // @UseGuards(AccessTokenGuard)
  getMyWorkspaces(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('siteId', ParseIntPipe) siteId: number,
  ) {
    return this.workspaceService.getMyWorkspaces(userId, siteId);
  }

  @Post('search')
  @UseGuards(AccessTokenGuard)
  searchWorkspace(@Body() searchWorkspaceDto: SearchWorkspaceDto) {
    return this.workspaceService.searchWorkspace(searchWorkspaceDto);
  }

  @Post('reorder')
  @UseGuards(AccessTokenGuard)
  reorderWorkspace(@Body() reorderWorkspaceDto: ReorderWorkspaceDto) {
    return this.workspaceService.reorderWorkspace(reorderWorkspaceDto);
  }

  @Post()
  @ApiCreatedResponse({ type: WorkspaceEntity })
  @UseGuards(AccessTokenGuard)
  createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.createWorkspace(createWorkspaceDto);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: WorkspaceEntity })
  @UseGuards(AccessTokenGuard)
  updateWorkspace(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.updateWorkspace(id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WorkspaceEntity })
  @UseGuards(AccessTokenGuard)
  deleteWorkspace(@Param('id', ParseIntPipe) id: number) {
    return this.workspaceService.deleteWorkspace(id);
  }
}
