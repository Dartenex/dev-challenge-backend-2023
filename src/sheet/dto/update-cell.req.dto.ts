import { IsNotEmpty } from 'class-validator';

export class UpdateCellReqDto {
  @IsNotEmpty()
  value: string | number;
}