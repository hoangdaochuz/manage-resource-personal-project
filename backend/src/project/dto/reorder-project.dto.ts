import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReorderProjectDTO {
  @ApiProperty()
  @IsNotEmpty()
  item: Project;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  newRank: number;

  @ApiProperty()
  @IsNotEmpty()
  items: Project[];
}
