import { Injectable, Inject, Logger, UploadedFile } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { RegistrationDto } from '../dto/registration.dto';
import * as crypto from 'crypto';
import { UserProfileDto } from '../dto/user.profile.dto';
import * as _ from 'underscore';
import { UserDto } from 'dto/user.dto';
import * as fs from 'fs';
import { UserPasswordDto } from 'dto/user.password.dto';

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
        return await this.userModel.findOne({'email': userEmail, 'status.key': 'ACTIVE'}).exec();
    }

    hashPassword(salt: string, plainPassword: string): string {
        return crypto.pbkdf2Sync(plainPassword, new Buffer(salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    }

    async updateUserProfile(userId: string, profileDto: UserProfileDto): Promise<IUser> {
        let user = await this.userModel.findById(userId);
        user.updatedOn = new Date();
        // Merge the user object with updated profile information
        user = _.extend(user, profileDto);
        return await user.save();
    }

    async manageUserProfile(userId: string, userDto: UserDto){
        let user = await this.userModel.findById(userId);
        user.updatedOn = new Date();
        // Merge the user object with updated profile information
        user = _.extend(user, userDto);
        return await user.save();
    }

    async uploadProfilePicture(userId: string, @UploadedFile() file): Promise<any>{
       const path = `${file.destination}/default.jpg`;
       return await new Promise((resolve, reject) => {
            fs.writeFile(path, file.buffer, (error) => {
                if (!error) {
                    this.userModel.findById(userId)
                        .then((user) => {
                            user.profileImageURL = file.path;
                            resolve(user.save());
                        })
                        .catch((err) => reject(err));
                } else {
                    reject(error);
                }
            });
        });
    }

    async validateAndUpdatePassword(userId: string, passwordDto: UserPasswordDto): Promise<IUser> {
        const user = await this.userModel.findById(userId);
        const hashPassword = this.hashPassword(user.salt, passwordDto.oldPassword);
        if (!user || user.password !== hashPassword){
           throw new Error('Incorrect old password!');
        }
        const newSalt = crypto.randomBytes(16).toString('base64');
        const newHash = this.hashPassword(newSalt, passwordDto.newPassword);
        user.salt = newSalt;
        user.password = newHash;
        return await user.save();
    }
}
