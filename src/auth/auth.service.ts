import { Injectable, Logger, HttpService, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { EnvProperties } from 'config/env-properties.model';
import { ENV_CONFIG_TOKEN } from '../config/constants';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly httpService: HttpService, @Inject(ENV_CONFIG_TOKEN) private readonly config: EnvProperties) {}

    createToken(payload: object): string {
        return this.jwtService.sign(payload);
    }

    async validateUser(signedUser: any): Promise<any> {
        Logger.log('Inside Auth service');
        const user = await this.userService.findUserByEmail(signedUser.email);
        if (user && user.status.key === 'ACTIVE')
            return user;
        else
            return false;
    }

    async getAuth0Token(): Promise<any> {
        const content = {
            client_id: this.config.oauth.clientId,
            client_secret: this.config.oauth.clientSecret,
            audience: this.config.oauth.audience,
            grant_type: this.config.oauth.grantType,
        };
        const options = {
            method: 'POST',
            url: this.config.oauth.tokenUrl,
            headers: { 'content-type': 'application/json' },
            data: content,
        };
        const resp = await this.httpService.request(options)
            .pipe(map(response => response.data));
        return resp;
    }

    handleAuth0Response(): Promise<string> {
        const authOptions = {
            clientID: this.config.oauth.clientId,
            domain: this.config.oauth.domain,
            responseType: 'token id_token',
            redirectUri: this.config.oauth.callbackUrl,
        };
        const auth = new auth0.WebAuth(authOptions);
        // auth.authorize(authOptions); To open oauth0 login url from client app
        return new Promise((resolve, reject) => {
            auth.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    Logger.log(authResult.accessToken);
                    resolve(authResult.accessToken);
                } else if (err) {
                    Logger.log(err);
                    reject(err);
                }
            });
        });
    }
}
