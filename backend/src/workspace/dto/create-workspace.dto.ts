import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  owner: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  projectIds: number[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  teamIds: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  order: number;
}
