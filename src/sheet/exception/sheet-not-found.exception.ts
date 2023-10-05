import { NotFoundException } from '@app/exception';

export class SheetNotFoundException extends NotFoundException {
  constructor() {
    super('Sheet not found!');
  }
}