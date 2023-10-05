import { IsNotEmpty } from 'class-validator';

export class UpdateCellParamsReqInDto {
  @IsNotEmpty()
  sheetId: string;
  @IsNotEmpty()
  cellId: string;
}