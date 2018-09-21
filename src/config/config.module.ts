import {Module} from '@nestjs/common';
import {configProviders} from './config.service';

@Module({
  providers: [...configProviders],
  exports: [...configProviders],
})
export class ConfigModule {}
