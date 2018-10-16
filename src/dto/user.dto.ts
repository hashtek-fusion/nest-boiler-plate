import { ApiModelProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class UserDto{
    @ApiModelProperty()
    readonly firstName: string;
    @ApiModelProperty()
    readonly lastName: string;
    @ApiModelProperty()
    readonly displayName?: string;
    @ApiModelProperty()
    readonly email: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly profileImageURL?: string;
    @ApiModelProperty()
    roles: string[];
    @ApiModelProperty()
    status: {key: string, value: string};
}