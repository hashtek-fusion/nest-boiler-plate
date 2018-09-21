import { Document } from 'mongoose';

export interface IUser extends Document{
    readonly firstName: string;
    readonly lastName: string;
    readonly displayName?: string;
    readonly email: string;
    readonly password: string;
    readonly salt: string;
    readonly profileImageURL?: string;
    readonly roles: string;
    readonly status: string;
    readonly updatedOn: Date;
    readonly createdOn: Date;
    readonly resetPasswordToken?: string;
    readonly resetPasswordExpires?: Date;
}