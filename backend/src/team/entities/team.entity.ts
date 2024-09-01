import { ApiProperty } from '@nestjs/swagger';
import { Team } from '@prisma/client';

export class TeamEntity implements Team {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner: number;
  @ApiProperty()
  order: number;
  @ApiProperty()
  memberIds: number[];
  @ApiProperty()
  workspaceId: number;
}
