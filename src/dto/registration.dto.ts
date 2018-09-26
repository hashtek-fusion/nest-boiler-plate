import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class RegistrationDto{
    @ApiModelProperty()
    @IsNotEmpty()
    readonly firstName: string;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly lastName: string;
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly password: string;
}