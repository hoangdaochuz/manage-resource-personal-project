import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}
  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }
  getAllUsers() {
    return this.prisma.user.findMany();
  }
  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  updateUserById(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  deleteUserById(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
  inviteUserToWorkspace(emailTo: string, emailFrom: string) {
    this.emailService.sendInviteUserMessage(emailTo, emailFrom);
  }
}
