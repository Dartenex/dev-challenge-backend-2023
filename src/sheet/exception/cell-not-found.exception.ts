import { NotFoundException } from '@app/exception';

export class CellNotFoundException extends NotFoundException {
  constructor() {
    super('Cell not found!');
  }
}