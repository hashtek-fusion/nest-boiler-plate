import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class UserProfileDto{
    @ApiModelProperty()
    firstName?: string;
    @ApiModelProperty()
    lastName?: string;
}