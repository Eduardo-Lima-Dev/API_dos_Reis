import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HaircutModule } from './haircut/haircut.module';
import { TagsController } from './tags/tags.controller';
import { TagsService } from './tags/tags.service';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PrismaModule, SupabaseModule, UsersModule, AuthModule, HaircutModule, TagsModule],
  controllers: [AppController, TagsController],
  providers: [AppService, TagsService],
})
export class AppModule {}
