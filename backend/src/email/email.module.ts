import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [EmailController],

  providers: [EmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'hyvong2805@gmail.com',
          pass: 'rpcb auay dylb dnym',
        },
      },
      defaults: {
        from: '"From Name" <hyvong2805@gmail.com>',
      },
      // template: {
      //   dir: join(__dirname, './templates'),
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    JwtModule,
    UserModule,
  ],
  exports: [EmailService],
})
export class EmailModule {}
