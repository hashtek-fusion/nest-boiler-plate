import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
