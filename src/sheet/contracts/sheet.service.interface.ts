import { CellDto, SheetInfoResDto, UpdateCellDto } from '../dto';

export interface SheetServiceInterface {
  updateCell(data: UpdateCellDto): any;
  getSheetInfo(id: string): Promise<SheetInfoResDto>;
  getCellInfo({ sheetId, id }: { sheetId: string, id: string }): Promise<CellDto | null>;
}