import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { JwtStrategy } from './passport/jwt.strategy';
import { UserModule } from '../user/user.module';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
    ConfigModule, UserModule, HttpModule],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
