import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationProviders } from './notification.providers';
import { DatabaseModule } from '../database/database.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [...NotificationProviders, NotificationService],
})
export class NotificationModule {}
