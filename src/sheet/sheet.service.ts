import { Inject, Injectable } from '@nestjs/common';
import { CellRepositoryInterface, SheetServiceInterface } from './contracts';
import { CellDto, SheetInfoResDto, UpdateCellDto } from './dto';
import { SheetDIKeys } from './di.keys';
import { CellNotFoundException, SheetNotFoundException } from './exception';
import { isInteger } from '../utils';

@Injectable()
export class SheetService implements SheetServiceInterface {
  public constructor(
    @Inject(SheetDIKeys.CELL_REPOSITORY) private cellRepository: CellRepositoryInterface,
  ) {}

  public async updateCell(data: UpdateCellDto) {
    if (!data.isValueFormula) {
      let resultValue: string;
      if (this.isStringNumeric(`${data.value}`)) {
        resultValue = `${this.calculate(`${data.value}`)}`;
      } else {
        resultValue = `${data.value}`;
      }
      const result = await this.cellRepository.updateOrCreate({
        sheetId: data.sheetId,
        cellId: data.cellId,
        value: `${data.value}`,
        result: `${resultValue}`,
      });
      return result;
    }
    const usedVars: string[] = this.getKeysFromFormula(`${data.value}`);
    let resultValueExpression: string;
    if (!usedVars.length) {
      const clearValue = typeof data.value === 'string' ? data.value.replace('=', '') : data.value;
      const valueToUpsert = this.calculate(`${clearValue}`);
      resultValueExpression = `${valueToUpsert}`;
    } else {
      const cellsByIds = await this.cellRepository.getCellsByIds(usedVars, data.sheetId);
      if (cellsByIds.length !== usedVars.length) {
        throw new Error('Unknown variables!');
      }
      let resExpr = data.value as string;
      for (const cellById of cellsByIds) {
        const cellVal = cellById.result;
        resExpr = resExpr.replace(cellById.id, cellVal).replace('=', '');
      }
      resultValueExpression = `${this.calculate(resExpr)}`;
    }
    const res = await this.cellRepository.updateOrCreate({
      sheetId: data.sheetId,
      cellId: data.cellId,
      value: `${data.value}`,
      result: resultValueExpression,
    });
    return res;
  }
  
  public async getSheetInfo(id: string): Promise<SheetInfoResDto> {
    let result: SheetInfoResDto = {};
    const cells: CellDto[] = await this.cellRepository.getListBySheetId(id);
    for (const cell of cells) {
      result[cell.id] = {
        value: cell.value,
        result: cell.result,
      };
    }
    if (!cells.length) {
      throw new SheetNotFoundException();
    }
    return result;
  }
  
  public async getCellInfo({ sheetId, id }: { sheetId: string, id: string }): Promise<CellDto | null> {
    const cellInfo = await this.cellRepository.getById(sheetId, id);
    if (!cellInfo) {
      throw new CellNotFoundException();
    }
    return cellInfo;
  }
  
  private isStringNumeric(value: string): boolean {
    const pattern = /^\+?-?\d+(\.\d+)?$/;
    return pattern.test(value);
  }
  
  private getKeysFromFormula(valFormula: string): string[] {
    const formattedExpression = valFormula.replace('=', '')
      .replaceAll(')', ' ')
      .replaceAll('(', ' ')
      .replaceAll('-', ' ')
      .replaceAll('+', ' ')
      .replaceAll('*', ' ')
      .replaceAll('/', ' ');
    const preKeys = formattedExpression.includes(' ')
      ? formattedExpression.trim().split(/\s/g)
        .map((k: string) => k.trim())
      : [];
    return preKeys.filter((c: string) => !this.isStringNumeric(c));
  }
  
  private calculate(expression: string): number {
    const result: number = Function(`return ${expression}`)();
    return isInteger(result) ? result : Number(result.toFixed(2));
  }
}