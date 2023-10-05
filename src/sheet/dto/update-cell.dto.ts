export interface UpdateCellDto {
  sheetId: string;
  cellId: string;
  value: string | number;
  isValueFormula: boolean;
}