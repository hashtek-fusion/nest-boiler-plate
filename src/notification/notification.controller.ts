import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseInterceptors,
    UploadedFile,
    FileInterceptor,
    Logger,
    UseGuards,
} from '@nestjs/common';
import { apiPath } from '../common/api';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiUseTags('Manage Notifications')
@Controller(apiPath(1, 'notifications'))
@UseGuards(RolesGuard)
@Controller(apiPath(1, 'users'))
export class NotificationController {
    constructor(){}

    @ApiOperation({ title: 'Send notification to user(s)' })
    @ApiResponse({
        status: 200,
        description: 'Notification sent to selected users',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Post('/push')
    pushNotification() {
        return {};
    }
}
