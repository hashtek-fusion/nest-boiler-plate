import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { UserDto } from 'dto/user.dto';

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userModel: Model<IUser>) {
    }

    async registerUser(userDto: UserDto): Promise<IUser> {
        const newUser = new this.userModel(userDto);
        return await newUser.save();
    }

    async listRegisteredUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }
}
