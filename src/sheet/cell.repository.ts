import { Injectable } from '@nestjs/common';
import { CellRepositoryInterface } from './contracts';
import { PrismaService } from '../db';
import { CellDto, UpdateCellRepoInDto } from './dto';
import { Cell } from '@prisma/client';

@Injectable()
export class CellRepository implements CellRepositoryInterface {
  public constructor(private readonly prismaService: PrismaService) {
  }
  async getById(sheetId: string, id: string): Promise<CellDto | null> {
    const cell = await this.prismaService.cell.findFirst({
      where: {
        id: id,
        sheetId: sheetId,
      }
    });
    if (!cell) {
      return null;
    }
    return {
      id: cell.id,
      sheetId: cell.sheetId,
      result: `${cell.result}`,
      value: cell.value
    };
  }
  async getListBySheetId(id: string): Promise<CellDto[]> {
    const cells = await this.prismaService.cell.findMany({
      where: {
        sheetId: id,
      }
    });
    return cells.map((c: Cell)=> ({
      id: c.id,
      sheetId: c.sheetId,
      result: `${c.result}`,
      value: c.value,
    }));
  }
  
  async getCellsByIds(ids: string[], sheetId: string): Promise<CellDto[]> {
    const cells = await this.prismaService.cell.findMany({
      where: {
        sheetId: sheetId,
        id: {
          in: ids,
        }
      }
    });
    return cells.map((c: Cell)=> ({
      id: c.id,
      sheetId: c.sheetId,
      result: `${c.result}`,
      value: c.value,
    }));
  }
  
  async updateOrCreate(data: UpdateCellRepoInDto) {
    const res = await this.prismaService.cell.upsert({
      where: {
        id_sheetId: {
          id: data.cellId,
          sheetId: data.sheetId,
        },
      },
      update: {
        value: data.value,
        result: data.result,
      },
      create: {
        id: data.cellId,
        sheetId: data.sheetId,
        value: data.value,
        result: data.result,
      }
    });
    return res;
  }
}