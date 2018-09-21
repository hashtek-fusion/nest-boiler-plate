import * as path from 'path';

import {ENV_CONFIG_TOKEN} from './constants';
import {EnvProperties} from './env-properties.model';

export const configProviders = [
  {
    provide: ENV_CONFIG_TOKEN,
    useFactory: async (): Promise<EnvProperties> => {
      const nodeEnv = process.env.NODE_ENV || 'development';
      const propertiesFolder = path.resolve(process.cwd(), 'properties');
      const config: EnvProperties = require(`${propertiesFolder}/${nodeEnv}.properties.json`);
      return config;
    },
  },
];
