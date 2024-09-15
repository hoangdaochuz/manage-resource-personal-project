import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
  imports: [PrismaModule],
  providers: [SiteService],
  controllers: [SiteController],
})
export class SiteModule {}
