import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
  @ApiProperty()
  @IsBoolean()
  isVerified: boolean;
  @ApiProperty()
  @IsBoolean()
  isDeleted: boolean;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt: Date;
  @ApiProperty()
  @IsString()
  @IsOptional()
  refreshToken: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  loginType: string;
}
