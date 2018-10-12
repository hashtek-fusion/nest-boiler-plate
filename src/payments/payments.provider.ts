import {Connection} from 'mongoose';
import {DB_CONFIG_TOKEN} from '../database/constants';
import { PaymentsSchema } from './payments.schema';
import { USER_PAYMENTS_REPOSITORY_TOKEN } from './constants';

export const PaymentProviders = [{
    provide: USER_PAYMENTS_REPOSITORY_TOKEN,
    useFactory: (connection: Connection) => connection.model('UserPayments', PaymentsSchema),
    inject: [DB_CONFIG_TOKEN],
}];