import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class searchProjectDto {
  @ApiProperty()
  @IsString()
  query: string;
  @ApiProperty({ required: true })
  @IsNumber()
  limit: number;
  @ApiProperty({ required: true })
  @IsNumber()
  offset: number;
}
