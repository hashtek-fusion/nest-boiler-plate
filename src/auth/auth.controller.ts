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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile, ApiImplicitHeader } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../dto/registration.dto';
import { LoginDto } from '../dto/login.dto';

@ApiUseTags('Authentication & Registration')
@Controller(apiPath(1, 'users'))
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) { }
    @ApiOperation({ title: 'Register a new user in the system' })
    @ApiResponse({
        status: 200,
        description: 'User Registered Successfully and returning user',
        type: RegistrationDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid Input and not able to register the user',
    })
    @Post('/register')
    async registerUser(@Body() reqBody: RegistrationDto) {
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
        type: LoginDto,
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
    async login(@Body() reqBody: LoginDto){
         const user = await this.userService.findUserByEmail(reqBody.email);
         if (!user){
            throw new BadRequestException('User not found!');
         }
         const hashPassword = this.userService.hashPassword(user.salt, reqBody.password);
         if (!user || user.password !== hashPassword){
            throw new BadRequestException('Incorrect password!');
         }
         // Remove sensitive data before creating token
         user.password = undefined;
         user.salt = undefined;
         const payload = {
            email: user.email,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
         };
         const token = this.authService.createToken(payload);
         return {token};
    }
}
