import { Document } from 'mongoose';

interface IStatus{
    readonly key: string;
    readonly value: string;
}
export interface IUser extends Document{
    readonly firstName: string;
    readonly lastName: string;
    readonly displayName?: string;
    readonly email: string;
    password: string;
    salt: string;
    readonly profileImageURL?: string;
    readonly roles: string | string[];
    readonly status: IStatus;
    readonly updatedOn: Date;
    readonly createdOn: Date;
    readonly resetPasswordToken?: string;
    readonly resetPasswordExpires?: Date;
}