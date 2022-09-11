import {
  CanActivate,
  ExecutionContext,
  Header,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Logger } from 'winston';
import { ROLES } from './ROLES';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('winston') private readonly logger: Logger,
  ) {}
  async canActivate(context: ExecutionContext) {
    this.logger.debug('Function : Validate users roles');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!roles) return true;
    if (!user) return false;

    const userRole = user.role;
    console.log(userRole);
    // if (userRole === ROLES.ADMIN) return true;
    const hasRole = () => roles.includes(userRole);
    return hasRole();
  }
}
