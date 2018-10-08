import {Connection} from 'mongoose';
import {DB_CONFIG_TOKEN} from '../database/constants';
import { NotificationSchema } from './notification.schema';
import { NOTIFICATION_REPOSITORY_TOKEN } from './constants';

export const NotificationProviders = [{
    provide: NOTIFICATION_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.model('Notification', NotificationSchema),
    inject: [DB_CONFIG_TOKEN],
}];
