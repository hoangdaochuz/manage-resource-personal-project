import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSiteDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  owner: number;
}
