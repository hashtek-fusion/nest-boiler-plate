import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class LoginDto{
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @ApiModelProperty()
    @IsNotEmpty()
    @Length(6)
    readonly password: string;
}