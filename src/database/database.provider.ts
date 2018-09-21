import { EnvProperties } from 'config/env-properties.model';
import { ENV_CONFIG_TOKEN } from 'config/constants';
import { DB_CONFIG_TOKEN } from './constants';
import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: DB_CONFIG_TOKEN,
        inject: [ENV_CONFIG_TOKEN],
        useFactory: async ({ db }: EnvProperties): Promise<typeof mongoose> => {
            const connectUri = `mongodb://${db.host}:${db.port}/${db.dbname}`;
            const dbOptions = {
                user: db.dbuser,
                pass: db.dbpassword,
                auth: { authSource: 'admin' },
                useNewUrlParser: true,
            };
            return await mongoose.connect(connectUri, dbOptions);
        },
    },
];
