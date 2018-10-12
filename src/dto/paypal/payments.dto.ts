import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface ISaleItem {
    readonly name: string;
    readonly sku: string;
    readonly price: string;
    readonly currency: string;
    readonly quantity: number;
}
export interface IAmount {
    readonly currency: string;
    readonly total: string;
}
export interface ITransaction {
    readonly item_list?: {
        readonly items: [ISaleItem];
    };
    readonly amount: IAmount;
    readonly description?: string;
}

export class PaymentsDto {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly intent: string;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly payer: {
        readonly payment_method: string;
    };
    @ApiModelProperty()
    readonly redirect_urls?: {
        readonly return_url: string;
        readonly cancel_url: string;
    };
    @ApiModelProperty()
    @IsNotEmpty()
    readonly transactions: [ITransaction];
}