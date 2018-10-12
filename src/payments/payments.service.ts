import { Injectable, Inject, Logger } from '@nestjs/common';
import { EnvProperties } from 'config/env-properties.model';
import { ENV_CONFIG_TOKEN } from '../config/constants';
import * as paypal from 'paypal-rest-sdk';
import { PaymentsDto } from '../dto/paypal/payments.dto';
import { RefundDto } from '../dto/paypal/refund.dto';
import { USER_PAYMENTS_REPOSITORY_TOKEN } from './constants';
import { Model } from 'mongoose';
import { IUserPayments } from './payments.interface';
import { UserPaymentDto } from '../dto/user.payment.dto';

@Injectable()
export class PaymentsService {
    constructor(@Inject(ENV_CONFIG_TOKEN) private readonly config: EnvProperties,
                @Inject(USER_PAYMENTS_REPOSITORY_TOKEN) private readonly userPaymentsModel: Model<IUserPayments>) {
        paypal.configure({
            mode: this.config.paypal.mode,
            client_id: this.config.paypal.clientId,
            client_secret: this.config.paypal.clientSecret,
        });
    }

    async makePaypalPayment(paymentsDto: PaymentsDto, userId: string): Promise<any> {
        return await new Promise((resolve, reject) => {
            paypal.payment.create(paymentsDto, (error, payment) => {
                if (!error) {
                    const userPaymentsDto = new UserPaymentDto();
                    userPaymentsDto.paymentType = { key: 'PAYPAL' };
                    userPaymentsDto.person = { _id: userId };
                    userPaymentsDto.transactionDetail = {
                        paymentId: payment.id,
                        description: payment.transactions[0].description,
                        amount:  payment.transactions[0].amount.total,
                        currency: payment.transactions[0].amount.currency,
                     };
                    const newUserPayment = new this.userPaymentsModel(userPaymentsDto);
                    newUserPayment.save()
                        .then((response) => resolve(payment))
                        .catch((err) => reject(err));
                }
                else {
                    reject(error);
                }
            });
        });
    }

    async getPaypalPaymentDetails(paymentId: string): Promise<any> {// Payment yet to complete in Created|Approved|Failed State
        return await new Promise((resolve, reject) => {
            paypal.payment.get(paymentId, (error, payment) => {
                if (!error) resolve(payment);
                else {
                    reject(error);
                }
            });
        });
    }

    async getPaypalSaleDetails(saleId: string): Promise<any> {// Sale : Completed payment
        return await new Promise((resolve, reject) => {
            paypal.sale.get(saleId, (error, sale) => {
                if (!error) resolve(sale);
                else {
                    reject(error);
                }
            });
        });
    }

    async processPaypalRefund(refundDto: RefundDto): Promise<any> {// Completed sale can be refunded partially or whole amount
        return await new Promise((resolve, reject) => {
            const saleId = refundDto.saleId;
            delete refundDto.saleId; // Refund object don't require sales id in its request
            paypal.sale.refund(saleId, refundDto, (error, refund) => {
                if (!error) resolve(refund);
                else {
                    reject(error);
                }
            });
        });
    }

}
