import { Injectable, Inject, Logger } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { INotification } from './notification.interface';
import { NotificationDto } from 'dto/notification.dto';
import * as _ from 'underscore';
import { NotificationManageDto } from 'dto/notification.update.dto';

@Injectable()
export class NotificationService {
    constructor(@Inject(NOTIFICATION_REPOSITORY_TOKEN) private readonly notificationModel: Model<INotification>){}

   async pushNotification(notificationDto: NotificationDto): Promise<INotification>{
        const newNotification = new this.notificationModel(notificationDto);
        const notification = await newNotification.save();
        return notification;
    }

    async getUserNotifications(userEmail: string): Promise<INotification[]>{
        const query = this.notificationModel.find({'status.key': 'ACTIVE'});
        query.where('viewers').elemMatch((elm) => {
            elm.where('email').equals(userEmail);
        });
        query.select('category status content viewers.status');
        return await query.exec();
    }

    async getAllNotifications(): Promise<INotification[]> {
        const query = this.notificationModel.find();
        query.select('category status content viewers')
        .populate({path: 'viewers.person',
            select: '_id firstName lastName',
        });
        return await query.exec();
    }

    async updateNotification(notificationManageDto: NotificationManageDto, notificationId: string): Promise<INotification> {
        let notification = await this.notificationModel.findById(notificationId);
        notification.updatedOn = new Date();
        // Merge with existing notification object and update the detail
        notification = _.extend(notification, notificationManageDto);
        return await notification.save();
    }
}
