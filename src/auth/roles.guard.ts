import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!roles) {
            // route isn't decorated with `@Roles`
            return true;
        }
        if (!user) {
            // user not logged - jwt strategy validate the token and returns invalid
            return false;
        }
        if (roles.length === 0) {
            // `@Roles` is empty (no roles requirement)
            return true;
        }
        if (user && user.roles) {
            const hasRole = () => {
                for (const userRolesIterator of user.roles) {
                    for (const rolesIterator of roles) {
                        if (rolesIterator === userRolesIterator) return true;
                    }
                }
                return false;
            };
            return hasRole();
        } else {// JWT Token invalid and user not present in the request
            return false;
        }
    }
}