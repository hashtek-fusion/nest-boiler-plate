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
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiUseTags('Manage Users')
@Controller(apiPath(1, 'users'))
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }
    @ApiOperation({ title: 'Registered user upload and manage profile picture' })
    @ApiResponse({
        status: 200,
        description: 'Profile Picture successfully saved into system',
        type: UserDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid file format or file size exceeds the limit',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @UseInterceptors(FileInterceptor('file', {}))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file', required: true})
    // @ApiImplicitHeader({name: 'X-CSRF-TOKEN', required: true})
    @ApiBearerAuth()
    @Roles()
    @Post('upload/profilePicture')
    uploadProfilePicture(@UploadedFile() file){
        Logger.log(file.size);
    }

    @ApiOperation({ title: 'To retrieve all the registered users from the system' })
    @ApiResponse({
        status: 200,
        description: 'List of registered users returned to client',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin', 'viewer')
    @ApiBearerAuth()
    @Get()
    async listRegisterdUsers() {
        return await this.userService.listRegisteredUsers();
    }
}
