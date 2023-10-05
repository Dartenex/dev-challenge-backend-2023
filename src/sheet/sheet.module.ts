import { Module } from '@nestjs/common';
import { SheetController } from './sheet.controller';
import { SheetDIKeys } from './di.keys';
import { SheetService } from './sheet.service';
import { CellRepository } from './cell.repository';
import { PrismaService } from '../db';

@Module({
  controllers: [SheetController],
  providers: [
    PrismaService,
    {
      provide: SheetDIKeys.SHEET_SERVICE,
      useClass: SheetService
    },
    {
      provide: SheetDIKeys.CELL_REPOSITORY,
      useClass: CellRepository,
    }
  ]
})
export class SheetModule {}