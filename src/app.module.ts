import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JWTMiddleware } from './auth/jwt.middleware';
import { UserController } from './user/user.controller';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, AuthModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(JWTMiddleware)
      // .forRoutes({path: '*', method: RequestMethod.ALL});
      .forRoutes(UserController, NotificationController);
  }
}
