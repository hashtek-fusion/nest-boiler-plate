import { Module, MulterModule } from '@nestjs/common';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [...userProviders, UserService],
  imports: [DatabaseModule],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
