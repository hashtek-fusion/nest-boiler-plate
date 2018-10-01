import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ConfigModule} from '../config/config.module';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule, UserModule],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
