import { Injectable, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }
    roles: any;
    canActivate(context: ExecutionContext) {
        this.roles = this.reflector.get<string[]>('roles', context.getHandler());
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        Logger.log('Inside Roles Guard');
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        if (!this.roles) {
            // route isn't decorated with `@Roles`
            return user;
        }
        if (this.roles.length === 0) {
            // `@Roles` is empty (no roles requirement)
            return user;
        }
        const hasRole = () => {
            for (const userRolesIterator of user.roles) {
                for (const rolesIterator of this.roles) {
                    if (rolesIterator === userRolesIterator) return true;
                }
            }
            return false;
        };
        if (hasRole()) {
            return user;
        } else {// JWT Token invalid and user not present in the request
            throw err || new UnauthorizedException();
        }
    }
}