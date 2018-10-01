import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { ENV_CONFIG_TOKEN } from '../config/constants';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, sign } from 'jsonwebtoken';
import { EnvProperties } from '../config/env-properties.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    private static readonly DEFAULT_JWT_SIGN_OPTIONS: SignOptions = {
        algorithm: 'HS256',
        expiresIn: 60 * 60,
    };
    private readonly signOptions: SignOptions;
    private readonly secret: string;
    constructor(@Inject(ENV_CONFIG_TOKEN) private readonly config: EnvProperties, private readonly userService: UserService) {
        this.secret = config.jwtToken.secret;
        this.signOptions = {
            algorithm: config.jwtToken.algorithm || AuthService.DEFAULT_JWT_SIGN_OPTIONS.algorithm,
            expiresIn: config.jwtToken.expiresIn || AuthService.DEFAULT_JWT_SIGN_OPTIONS.expiresIn,
        };
    }

    createToken(payload: object): string {
        return sign(payload, this.secret, this.signOptions);
    }

    async validateUser(signedUser: any): Promise <boolean> {
        const user = await this.userService.findUserByEmail(signedUser.email);
        if (user && user.status.key === 'ACTIVE')
            return true;
        else
            return false;
    }
}
