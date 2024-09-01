import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
export class ProjectEntity implements Project {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  owner: number;
  @ApiProperty()
  order: number;
  @ApiProperty()
  workspaceId: number;
}
