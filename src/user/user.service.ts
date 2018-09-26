import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { RegistrationDto } from 'dto/registration.dto';

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userModel: Model<IUser>) {
    }

    async registerUser(regDto: RegistrationDto): Promise<IUser> {
        const newUser = new this.userModel(regDto);
        return await newUser.save();
    }

    async listRegisteredUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }
}
