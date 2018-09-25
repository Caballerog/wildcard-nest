import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(userID: number = -1) {
    const msg = `The User: ID: ${userID} not found`;
    super(msg);
  }
}
