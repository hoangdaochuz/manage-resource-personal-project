import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { SearchTeamDto } from './dto/search-team.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TeamEntity } from './entities/team.entity';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';

@Controller('api/v1/team')
@ApiTags('Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}
  @Get()
  @ApiOkResponse({ type: TeamEntity, isArray: true })
  @UseGuards(AccessTokenGuard)
  getAllTeams() {
    return this.teamService.getAllTeam();
  }

  @Get('paginate')
  @UseGuards(AccessTokenGuard)
  getTeamsPaginate(@Query() query: object) {
    return this.teamService.getTeamsPaginate(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamEntity })
  @UseGuards(AccessTokenGuard)
  getTeamById(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.getTeamById(id);
  }

  @Post('search')
  @UseGuards(AccessTokenGuard)
  searchTeam(@Body() searchTeamDto: SearchTeamDto) {
    return this.teamService.searchTeam(searchTeamDto);
  }

  @Post()
  @ApiCreatedResponse({ type: TeamEntity })
  @UseGuards(AccessTokenGuard)
  createNewTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createNewTeam(createTeamDto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TeamEntity })
  @UseGuards(AccessTokenGuard)
  updateTeam(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TeamEntity })
  @UseGuards(AccessTokenGuard)
  deleteTeam(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.deleteTeam(id);
  }
}
