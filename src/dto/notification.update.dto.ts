import { ApiModelProperty } from '@nestjs/swagger';

export class NotificationManageDto{
    @ApiModelProperty()
    category?: object;
    @ApiModelProperty()
    status?: object;
    @ApiModelProperty()
    viewers?: any[];
    @ApiModelProperty()
    content?: string;
}