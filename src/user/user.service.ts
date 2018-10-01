import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { RegistrationDto } from 'dto/registration.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
    constructor(@Inject(USER_REPOSITORY_TOKEN) private readonly userModel: Model<IUser>) {
    }

    async registerUser(regDto: RegistrationDto): Promise<IUser> {
        const salt = crypto.randomBytes(16).toString('base64');
        const hash = crypto.pbkdf2Sync(regDto.password, new Buffer(salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
        regDto.salt = salt;
        regDto.password = hash;
        const newUser = new this.userModel(regDto);
        const user = await newUser.save();
        // Removing sensitive data before returning the user
        user.password = undefined;
        user.salt = undefined;
        return user;
    }

    async listRegisteredUsers(): Promise<IUser[]> {
        return await this.userModel.find({}, '-salt -password').exec();
    }

    async findUserByEmail(userEmail: string): Promise<IUser> {
        return await this.userModel.findOne({email: userEmail}).exec();
    }

    hashPassword(salt: string, plainPassword: string): string {
        return crypto.pbkdf2Sync(plainPassword, new Buffer(salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    }
}
