import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EmailConfirmDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
}
