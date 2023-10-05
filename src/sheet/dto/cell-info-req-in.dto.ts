import { IsNotEmpty } from 'class-validator';

export class CellInfoReqInDto {
  @IsNotEmpty()
  sheetId: string;
  @IsNotEmpty()
  cellId: string;
}