import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  order: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  workspaceId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  owner: number | null;
}
