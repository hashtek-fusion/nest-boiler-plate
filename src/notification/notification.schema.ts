import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
export const NotificationSchema = new Schema({
    category: {
        key: {
            type: String,
            enum: ['GENERAL', 'ALERTS'],
            default: 'GENERAL',
        },
        value: { type: String },
    },
    status: {
        key: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE'],
            default: 'ACTIVE',
        },
        value: { type: String },
    },
    viewers: [{
        email: {type: String, required: true, trim: true},
        person: { type: ObjectId, ref: 'User' },
        status: {
            key: {
                type: String,
                enum: ['READ', 'UNREAD'],
                default: 'UNREAD',
            },
            value: { type: String },
        },
    },
    ],
    content: {type: String},
    updatedOn: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});