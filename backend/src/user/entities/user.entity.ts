import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  isVerified: boolean;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  deleteAt: Date;
  @ApiProperty()
  refreshToken: string;
}
