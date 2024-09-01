import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsString()
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
  deleteAt: Date;
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
