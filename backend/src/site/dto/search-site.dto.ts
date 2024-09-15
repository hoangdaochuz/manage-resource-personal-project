import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SearchSiteDTO {
  @IsNumber()
  @ApiProperty()
  id?: number;
  @IsNumber()
  @ApiProperty()
  owner?: number;
  @IsString()
  @ApiProperty()
  name?: string;
}
