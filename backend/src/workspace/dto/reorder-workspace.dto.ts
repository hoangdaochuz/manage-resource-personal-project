import { ApiProperty } from '@nestjs/swagger';
import { Workspace } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ReorderWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  item: Workspace;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  newRank: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  items: Workspace[];
}
