import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    createToken(payload: object): string {
        return this.jwtService.sign(payload);
    }

    async validateUser(signedUser: any): Promise <any> {
        Logger.log('Inside Auth service');
        const user = await this.userService.findUserByEmail(signedUser.email);
        if (user && user.status.key === 'ACTIVE')
            return user;
        else
           return false;
    }
}
