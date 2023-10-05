import { IsNotEmpty } from 'class-validator';

export class SheetInfoReqInDto {
  @IsNotEmpty()
  sheetId: string;
}