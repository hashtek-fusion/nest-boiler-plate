import { Document } from 'mongoose';
import { IUser } from 'user/user.interface';

export interface IUserPayments extends Document{
    paymentType: {
        key: string;
        value: string;
    };
    readonly person: IUser;
    transactionDetail: {
        transactionId?: string;
        paymentId?: string;
        saleId?: string;
        description?: string;
        amount: string;
        currency: string;
    };
    updatedOn: Date;
    readonly createdOn: Date;
}