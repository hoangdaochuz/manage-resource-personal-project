import { ApiProperty } from '@nestjs/swagger';
import { Workspace } from '@prisma/client';

export class WorkspaceEntity implements Workspace {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner: number;
  @ApiProperty()
  projectIds: number[];
  @ApiProperty()
  teamIds: number[];
  @ApiProperty()
  order: number;
}
