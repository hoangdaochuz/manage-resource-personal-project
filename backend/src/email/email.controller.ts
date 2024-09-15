import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConfirmDto } from './dto/emailConfirm.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('api/v1/email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('confirm')
  @ApiOkResponse({ type: UserEntity })
  async confirmEmail(@Body() emailConfirmDto: EmailConfirmDto) {
    const token = emailConfirmDto.token;
    const email = await this.emailService.decodeConfirmationToken(token);
    return await this.emailService.confirmEmail(email);
  }

  //[TODO] implement resend confirm link when token is expired
  // @Post('resend-confirm')
  // async resendConfirmEmail(@Req()) {}
}
