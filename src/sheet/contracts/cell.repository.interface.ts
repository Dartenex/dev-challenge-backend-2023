import { CellDto, UpdateCellRepoInDto } from '../dto';

export interface CellRepositoryInterface {
  getById(sheetId: string, id: string): Promise<CellDto | null>;
  getListBySheetId(id: string): Promise<CellDto[]>;
  updateOrCreate({}: UpdateCellRepoInDto);
  getCellsByIds(ids: string[], sheetId: string): Promise<CellDto[]>;
}