export class UserPaymentDto{
    paymentType: {
        key: string;
        value?: string;
    };
    person: {_id: string};
    transactionDetail: {
        transactionId?: string;
        paymentId?: string;
        saleId?: string;
        description?: string;
        amount: string;
        currency: string;
    };
    updatedOn: Date;
    readonly createdOn: Date;
}