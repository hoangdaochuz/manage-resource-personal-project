import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  owner: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  order: number | null;
  @ApiProperty()
  @IsArray()
  memberIds: number[];
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  workspaceId: number;
}
