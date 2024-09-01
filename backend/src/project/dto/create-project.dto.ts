import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createProjectDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  owner: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  workspaceId: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  order: number | null;
}
