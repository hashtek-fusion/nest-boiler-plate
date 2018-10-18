import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UserPasswordDto{
    @ApiModelProperty()
    @IsNotEmpty()
    @Length(6)
    readonly oldPassword: string;
    @ApiModelProperty()
    @IsNotEmpty()
    @Length(6)
    readonly newPassword: string;
    @ApiModelProperty()
    @IsNotEmpty()
    @Length(6)
    readonly confirmPassword: string;
}