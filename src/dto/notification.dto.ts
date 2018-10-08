import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class NotificationDto{
    @ApiModelProperty()
    @IsNotEmpty()
    readonly category: object;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly status: object;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly viewers: any[];
    @ApiModelProperty()
    @IsNotEmpty()
    readonly content: string;
}