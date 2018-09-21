import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'database/database.module';

@Module({
  providers: [...userProviders],
  imports: [DatabaseModule],
})
export class UserModule {}
