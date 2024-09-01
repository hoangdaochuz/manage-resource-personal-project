import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  owner: number;

  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsArray()
  memberIds: number[];

  @ApiProperty()
  @IsNumber()
  workspaceId: number;
}
