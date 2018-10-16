import { Document } from 'mongoose';

interface IStatus{
    readonly key: string;
    readonly value: string;
}
export interface IUser extends Document{
    firstName: string;
    lastName: string;
    displayName?: string;
    readonly email: string;
    password: string;
    salt: string;
    profileImageURL?: string;
    roles: string | string[];
    status: IStatus;
    updatedOn: Date;
    readonly createdOn: Date;
    readonly resetPasswordToken?: string;
    readonly resetPasswordExpires?: Date;
}