import {UserSchema} from './user.schema';
import {USER_REPOSITORY_TOKEN} from './constants';
import {Connection} from 'mongoose';
import {DB_CONFIG_TOKEN} from 'database/constants';

export const userProviders = [{
    provide: USER_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: [DB_CONFIG_TOKEN],
}];
