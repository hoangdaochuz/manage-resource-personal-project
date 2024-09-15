import { ApiProperty } from '@nestjs/swagger';
import { Site } from '@prisma/client';

export class SiteEntity implements Site {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  owner: number;
}
