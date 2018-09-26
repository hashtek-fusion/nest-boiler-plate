import { ApiModelProperty } from '@nestjs/swagger';

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
    readonly roles: string;
    @ApiModelProperty()
    readonly status: string;
}