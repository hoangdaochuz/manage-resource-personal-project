import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import { randomBytes } from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}
  googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
  async signin(signinDto: SignInDto) {
    // check user exist
    const user = await this.userService.getUserByEmail(signinDto.email);
    if (!user) throw new BadRequestException('email or password is incorrect');
    // check password
    const isMatch = await argon2.verify(user.password, signinDto.password);
    if (!isMatch)
      throw new BadRequestException('email or password is incorrect');
    // create token
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      ...result,
      ...tokens,
    };
  }
  async logout(id: number) {
    await this.userService.updateUserById(id, {
      refreshToken: null,
    } as UpdateUserDto);
  }

  async hashData(password: string): Promise<string> {
    const hashPassword = await argon2.hash(password);
    return hashPassword;
  }

  async signup(signupDto: SignUpDto): Promise<any> {
    // check if user exists
    const isExistUser = await this.prisma.user.findUnique({
      where: {
        email: signupDto.email,
      },
    });
    if (isExistUser) throw new BadRequestException('User already exist');
    // hash password
    const hashPassword = await this.hashData(signupDto.password);
    // create user
    const user = await this.userService.createUser({
      ...signupDto,
      password: hashPassword,
      isActive: false,
      isDeleted: false,
      isVerified: false,
      loginType: 'normal',
    } as CreateUserDto);
    // create token
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    await this.emailService.sendUserConfirmation(
      user.email,
      user.username,
      tokens.accessToken,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      ...result,
      ...tokens,
    };
  }
  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async refreshToken(id: number, refreshToken: string) {
    const user = await this.userService.getUserById(id);
    if (!user || !user.refreshToken)
      throw new BadRequestException('Access denied');
    const isMatchRefreshToken = argon2.verify(user.refreshToken, refreshToken);
    if (!isMatchRefreshToken) throw new BadRequestException('Access denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
    };
  }

  async resetPasswordRequest(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const newToken = randomBytes(32).toString('hex');
    const newTokenHash = await argon2.hash(newToken);
    // update temp token to password field
    await this.prisma.user.update({
      where: { email },
      data: {
        password: newTokenHash,
      },
    });
    // send email
    await this.emailService.sendResetPasswordConfirm(email, newToken);
    return {
      isSuccess: true,
      message: 'Send mail successfully',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { newPassword, token, email } = resetPasswordDto;
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    const userToken = user.password;
    if (!userToken)
      throw new BadRequestException('Invalid or expired password reset token');
    const isMatch = await argon2.verify(userToken, token);
    if (!isMatch)
      throw new BadRequestException('Invalid or expired password reset token');
    const newPasswordHash = await this.hashData(newPassword);
    // update password user
    await this.prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPasswordHash,
      },
    });
    return {
      isSuccess: true,
      message: 'Reset password successfully',
    };
  }

  async getTokens(id: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
