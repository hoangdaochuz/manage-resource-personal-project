import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class InviteUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  emailTo: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  emailFrom: string;
}
