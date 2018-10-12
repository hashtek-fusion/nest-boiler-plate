import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IAmount } from './payments.dto';

export class RefundDto {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly amount: IAmount;
    @ApiModelProperty()
    @IsNotEmpty()
    saleId: string;
}