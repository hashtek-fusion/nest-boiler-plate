import { Document } from 'mongoose';
import { IUser } from 'user/user.interface';

interface IStatus{
    key: string;
    value: string;
}
interface IViewers{
    person: IUser;
    status: IStatus;
    email: string;
}
interface ICategory{
    key: string;
    value: string;
}
export interface INotification extends Document{
    category: ICategory;
    status: IStatus;
    viewers: IViewers[];
    content: string;
    updatedOn: Date;
    readonly createdOn: Date;
}
