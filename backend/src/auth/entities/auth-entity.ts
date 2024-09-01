import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  isVerified: boolean;
  @ApiProperty()
  isDeleted: boolean;
  @ApiProperty()
  deletedAt: Date | null;
  @ApiProperty()
  refreshToken: string;
}
