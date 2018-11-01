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
    Logger,
    UseGuards,
    Req,
    FileInterceptor,
    Res,
} from '@nestjs/common';
import { apiPath } from '../common/api';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserProfileDto } from '../dto/user.profile.dto';
import { MulterCustomConfigForProfile } from '../config/multer.custom.config';
import { UserPasswordDto } from '../dto/user.password.dto';
import { Response } from 'express-serve-static-core';
import { join } from 'path';

@ApiUseTags('Manage Users')
@Controller(apiPath(1, 'users'))
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}
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
    @UseInterceptors(FileInterceptor('file', MulterCustomConfigForProfile))
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({name: 'file', required: true})
    // @ApiImplicitHeader({name: 'X-CSRF-TOKEN', required: true})
    @ApiBearerAuth()
    @Roles('viewer')
    @Post('profile/picture')
    async uploadProfilePicture(@UploadedFile() file, @Req() req: any){
        const userId = req.user._id;
        try {
            const user = await this.userService.uploadProfilePicture(userId, file);
            // Remove sensitive information before returning the user object
            user.password = undefined;
            user.salt = undefined;
            return user;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Registered user to get their profile picture rendered in browser' })
    @ApiResponse({
        status: 200,
        description: 'Profile Picture returned successfully for authorized user',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @ApiBearerAuth()
    @Roles('viewer')
    @Get('profile/picture')
    getProfilePicture(@Req() req: any, @Res() res: Response) {
        let picturePath = `/${req.user.profileImageURL}`;
        picturePath = join(__dirname, '..', '..', picturePath);
        res.sendFile(picturePath);
    }

    @ApiOperation({ title: 'Registered user can manage their profile' })
    @ApiResponse({
        status: 200,
        description: 'Updated user profile gets persisted into system',
        type: UserDto,
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @ApiBearerAuth()
    @Roles('viewer')
    @Put('/profile')
    async updateUserProfile(@Req() req: any, @Body() reqBody: UserProfileDto){
        const userId = req.user._id;
        try{
            const user = await this.userService.updateUserProfile(userId, reqBody);
            // Remove sensitive information before returning the user object
            user.password = undefined;
            user.salt = undefined;
            return user;
        }catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Registered user can change their password' })
    @ApiResponse({
        status: 200,
        description: 'Password will be reset and modified in the system and user details returned',
        type: UserDto,
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @ApiBearerAuth()
    @Roles('viewer')
    @Put('/profile/password')
    async updateUserPassword(@Req() req: any, @Body() reqBody: UserPasswordDto){
        const userId = req.user._id;
        if (reqBody.newPassword !== reqBody.confirmPassword){
            throw new BadRequestException('new password and confirm password did not match');
        }
        try{
            const user =  await this.userService.validateAndUpdatePassword(userId, reqBody);
            user.salt = undefined;
            user.password = undefined;
            return user;
        }catch (err){
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Admin user can manage the user profiles' })
    @ApiResponse({
        status: 200,
        description: 'Registered users status and roles get updated into system by admin user',
        type: UserDto,
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @ApiBearerAuth()
    @Roles('admin')
    @Put('/profile/:id')
    async manageUserProfile(@Body() reqBody: UserDto, @Param('id') userId: string){
        try{
            const user = await this.userService.manageUserProfile(userId, reqBody);
            // Remove sensitive information before returning the user object
            user.password = undefined;
            user.salt = undefined;
            return user;
        }catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Admin User to retrieve all the registered users from the system to manage' })
    @ApiResponse({
        status: 200,
        description: 'List of registered users returned to client',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Get()
    async listRegisterdUsers() {
        return await this.userService.listRegisteredUsers();
    }
}
