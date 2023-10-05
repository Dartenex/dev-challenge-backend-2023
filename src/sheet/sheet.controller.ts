import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post
} from '@nestjs/common';
import { SheetDIKeys } from './di.keys';
import { SheetServiceInterface } from './contracts';
import {
  CellDto,
  CellInfoReqInDto,
  SheetInfoReqInDto,
  SheetInfoResDto,
  UpdateCellParamsReqInDto,
  UpdateCellReqDto
} from './dto';
import { isValueFormula } from './functions';

@Controller('sheet')
export class SheetController {
  constructor(
    @Inject(SheetDIKeys.SHEET_SERVICE) private sheetService: SheetServiceInterface,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(':sheetId')
  async getSheetInfo(@Param() { sheetId }: SheetInfoReqInDto): Promise<SheetInfoResDto> {
    return await this.sheetService.getSheetInfo(sheetId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':sheetId/:cellId')
  async getCellInfo(@Param() { sheetId, cellId }: CellInfoReqInDto): Promise<CellDto> {
    return await this.sheetService.getCellInfo({ sheetId, id: cellId });
  }

  @Post(':sheetId/:cellId')
  async updateCell(
    @Param() { sheetId, cellId }: UpdateCellParamsReqInDto,
    @Body() reqBody: UpdateCellReqDto
  ) {
    const { value: updValue, isFormula } = this.getProcessedValue(reqBody.value);
    const result = await this.sheetService.updateCell({
      sheetId: sheetId,
      cellId: cellId,
      value: updValue,
      isValueFormula: isFormula,
    });
    return { result: result };
  }
  
  private getProcessedValue(value: string | number): { value: string | number, isFormula: boolean } {
    const isString = typeof value === 'string';
    const resValue = isString ? value.replaceAll(' ', '') : value;
    const isFormula = typeof resValue === 'string' ? isValueFormula(resValue) : false;
    return {
      value: resValue,
      isFormula: isFormula,
    };
  }
}