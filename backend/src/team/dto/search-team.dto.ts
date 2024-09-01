import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SearchTeamDto {
  @ApiProperty()
  @IsString()
  query: string;
  @ApiProperty()
  @IsNumber()
  limit: number;
  @ApiProperty()
  @IsNumber()
  offset: number;
}
