import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async sendUserConfirmation(email: string, username: string, token: string) {
    const url = `http://localhost:5173/confirm-noti?token=${token}`;
    await this.mailerService.sendMail({
      from: '"Support Team" <hyvong2805@gmail.com>',
      to: email,
      subject: 'Welcome to Clickup App! Confirm your Email',
      html: `
      <p>Hey ${username},</p>
      <p>Please click below to confirm your email</p>
      <p>
        <a href='${url}'>Confirm</a>
      </p>
      
      <p>If you did not request this email you can safely ignore it.</p>
      `,
    });
  }

  async sendInviteUserMessage(emailTo: string, emailFrom: string) {
    const url = `http://localhost:5173/login`;
    await this.mailerService.sendMail({
      from: '"Support Team" <hyvong2805@gmail.com>',
      to: emailTo,
      subject: 'Welcome to Clickup App',
      html: `
        <p>You are invited to join the Workspace on ClickUp by ${emailFrom}</p>
        <p>
          <a href='${url}'>Join now!</a>
        </p>
      `,
    });
  }

  async sendResetPasswordConfirm(email: string, token: string) {
    const url = `http://localhost:5173/reset-password?token=${token}&email=${email}`;
    await this.mailerService.sendMail({
      from: '"Support Team" <hyvong2805@gmail.com>',
      to: email,
      subject: 'Reset password',
      html: `
        <div>
          <p>Hi,</p>
          <p>You requested to reset password.</p>
          <p>Please click the link below to reset your password</p>
          <a href='${url}'>Reset Password</a>
        </div>
      `,
    });
  }

  async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError')
        throw new BadRequestException('Email confirmation token expired');
      throw new BadRequestException('Bad confirmation token');
    }
  }

  async confirmEmail(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user.isVerified)
      throw new BadRequestException('Email already verified');
    return await this.userService.updateUserById(user.id, {
      ...user,
      isVerified: true,
    });
  }
}
