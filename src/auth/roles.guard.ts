import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflactor.getAllAndOverride<'user' | 'admin'>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();
    return requiredRole === user.role;
  }
}
