import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HaircutModule } from './haircut/haircut.module';

@Module({
  imports: [PrismaModule, SupabaseModule, UsersModule, AuthModule, HaircutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
