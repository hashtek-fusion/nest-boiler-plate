import { EnvProperties } from 'config/env-properties.model';
import { ENV_CONFIG_TOKEN } from '../config/constants';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

export class JwtConfigService implements JwtOptionsFactory {
    createJwtOptions(): JwtModuleOptions{
        return this.signOptions;
    }
    private readonly signOptions: JwtModuleOptions;
    constructor(@Inject(ENV_CONFIG_TOKEN) private readonly config: EnvProperties) {
        this.signOptions = {
            secretOrPrivateKey: this.config.jwtToken.secret,
            signOptions: {
                expiresIn: this.config.jwtToken.expiresIn || 60 * 60,
                algorithm: this.config.jwtToken.algorithm || 'HS256',
            },
        };
    }
}
