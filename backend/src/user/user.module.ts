import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, forwardRef(() => EmailModule)],
  exports: [UserService],
})
export class UserModule {}
