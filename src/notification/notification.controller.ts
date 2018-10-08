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
    Req,
} from '@nestjs/common';
import { apiPath } from '../common/api';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { NotificationDto } from '../dto/notification.dto';
import { NotificationService } from './notification.service';
import { NotificationManageDto } from '../dto/notification.update.dto';

@ApiUseTags('Manage Notifications')
@UseGuards(RolesGuard)
@Controller(apiPath(1, 'notifications'))
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){}

    @ApiOperation({ title: 'Admin user to Send notification to registered user(s)' })
    @ApiResponse({
        status: 200,
        description: 'Notification sent to selected users',
        type: NotificationDto,
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Post('/push')
    async pushNotification(@Body() reqBody: NotificationDto) {
        try{
            return await this.notificationService.pushNotification(reqBody);
        }catch (err){
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Retrieve notifications for logged in user' })
    @ApiResponse({
        status: 200,
        description: 'Notifications returned for authorized user',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('viewer')
    @ApiBearerAuth()
    @Get('/user')
    async getUserNotifications(@Req() req: any){
        const userId = req.user.email;
        try{
            return await this.notificationService.getUserNotifications(userId);
        }catch (err){
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Retrieve all notifications for admin user to manage it' })
    @ApiResponse({
        status: 200,
        description: 'All the notifications available in the system returned to authorized admin person',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Get('list')
    async listAllUserNotifications(){
        try{
            return await this.notificationService.getAllNotifications();
        }catch (err){
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Manage status, category and content of specific notification by Admin user' })
    @ApiResponse({
        status: 200,
        description: 'Updated Notification details sent back to requested user',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Put(':id')
    manageNotification(@Body() notificationDto: NotificationManageDto, @Param('id') notificationId: string){
        try{
            return this.notificationService.updateNotification(notificationDto, notificationId);
        }catch (err){
            throw new InternalServerErrorException(err.message);
        }
    }
}
