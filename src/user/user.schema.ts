import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    displayName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
    salt: {
        type: String,
    },
    profileImageURL: {
        type: String,
        default: '/uploads/profile/avatar.png',
    },
    roles: {
        type: [{
            type: String,
            enum: ['viewer', 'admin', 'editor'],
        }],
        default: ['viewer'],
    },
    status: {
        key: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
        },
        value: { type: String },
    },
    updatedOn: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    /* For reset password */
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
});