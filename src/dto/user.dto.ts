import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto{
    @ApiModelProperty()
    @IsNotEmpty()
    readonly firstName: string;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly lastName: string;
    @ApiModelProperty()
    readonly displayName?: string;
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @ApiModelProperty()
    @IsNotEmpty()
    readonly password: string;
    @ApiModelProperty()
    readonly profileImageURL?: string;
    @ApiModelProperty()
    readonly roles: string;
    @ApiModelProperty()
    readonly status: string;
}