import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export const PaymentsSchema = new Schema({
    paymentType: {
        key: {
            type: String,
            enum: ['PAYPAL', 'VISA', 'MASTER', 'AMEX'],
            default: 'PAYPAL',
        },
        value: { type: String },
    },
    person: { type: ObjectId, ref: 'User' },
    transactionDetail: {
        transactionId: {type: String},
        paymentId: {type: String},
        saleId: {type: String},
        description: {type: String},
        amount: {type: String},
        currency: {type: String},
    },
    updatedOn: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});