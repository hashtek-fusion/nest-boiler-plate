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
} from '@nestjs/common';
import { apiPath } from 'common/api';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from 'dto/user.dto';

@ApiUseTags('Manage Registration & Users')
@Controller(apiPath(1, 'users'))
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ title: 'Register a new user in the system' })
    @ApiResponse({
        status: 200,
        description: 'User Registered Successfully and returning user',
        type: UserDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid Input and not able to register the user',
    })
    @Post('/register')
    async registerUser(@Body() reqBody: UserDto) {
        try {
            return await this.userService.registerUser(reqBody);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Login to System to access protected resources' })
    @ApiResponse({
        status: 200,
        description: 'JWT Token returned to manage the client session',
        type: UserDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid Input and not able to login',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Post('/login')
    login(@Body() reqBody: UserDto){

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
    @Get()
    async listRegisterdUsers() {
        return await this.userService.listRegisteredUsers();
    }
}
