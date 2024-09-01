import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthEntity } from './entities/auth-entity';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { GoogleOAuthGuard } from './guard/google-oauth.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async googleAuth(req: Request) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Post('signin')
  @ApiOkResponse({ type: AuthEntity })
  signin(@Body() signinDto: SignInDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  @ApiCreatedResponse({ type: AuthEntity })
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }

  @Get('logout')
  @UseGuards(AccessTokenGuard)
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['sub']);
  }

  @Get('refresh')
  // @UseGuards(RefreshTokenGuard)
  refreshToken(@Req() req: Request) {
    console.log('🚀 ~ AuthController ~ refreshToken ~ req:', req);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const id = Number(req.get('userid'));
    return this.authService.refreshToken(id, refreshToken);
  }

  @Post('reset-password-request')
  resetPasswordRequest(@Body('email') email: string) {
    return this.authService.resetPasswordRequest(email);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
