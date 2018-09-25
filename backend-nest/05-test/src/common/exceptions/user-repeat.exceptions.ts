import { ForbiddenException } from '@nestjs/common';
import { User } from '../../modules/users/interfaces/user.interface';

export class UserRepeatException extends ForbiddenException {
  constructor(user: User) {
    const msg = `The User: ${user.id} - ${user.name} is repeated`;
    super(msg);
  }
}
