import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ANONYMOUS } from '../config/constants';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(req, context: ExecutionContext): boolean {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) {
      return false;
    }
    const user = req.user;
    const hasRole = () => !!roles.find(role => user.rol === role);
    const isAllRole = () => !!roles.find(role => role === USER_ANONYMOUS);

    return isAllRole() || (user && user.rol && hasRole());
  }
}
