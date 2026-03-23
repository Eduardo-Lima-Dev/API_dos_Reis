import { Module } from '@nestjs/common';
import { HaircutController } from './haircut.controller';
import { HaircutService } from './haircut.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [HaircutController],
  providers: [HaircutService],
  imports: [PrismaModule],
})
export class HaircutModule {}
