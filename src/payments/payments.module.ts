import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '../config/config.module';
import { PaymentProviders } from './payments.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [PaymentsController],
  providers: [...PaymentProviders, PaymentsService],
})
export class PaymentsModule { }
