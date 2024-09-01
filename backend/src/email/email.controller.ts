import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConfirmDto } from './dto/emailConfirm.dto';

@Controller('api/v1/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('confirm')
  async confirmEmail(@Body() emailConfirmDto: EmailConfirmDto) {
    const token = emailConfirmDto.token;
    const email = await this.emailService.decodeConfirmationToken(token);
    await this.emailService.confirmEmail(email);
  }

  //[TODO] implement resend confirm link when token is expired
  // @Post('resend-confirm')
  // async resendConfirmEmail(@Req()) {}
}
