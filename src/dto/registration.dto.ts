import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Min} from 'class-validator';

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
    @Min(6)
    password: string;
    salt: string;
}