import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetModule } from '../sheet/sheet.module';
import { PrismaService } from '../db';

@Module({
  imports: [SheetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
