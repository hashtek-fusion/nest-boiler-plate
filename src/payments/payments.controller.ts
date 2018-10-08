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
import { PaymentsService } from './payments.service';

@ApiUseTags('Manage Payments')
@UseGuards(RolesGuard)
@Controller(apiPath(1, 'payments'))
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService){}

    @ApiOperation({ title: 'Registered user to make payment through paypal for the product/service purchased ' })
    @ApiResponse({
        status: 200,
        description: 'Paypal will authorize the user payment and complete the sale',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('viewer')
    @ApiBearerAuth()
    @Post('paypal/authorize')
    authorizePaypalPayment(){

    }

    @ApiOperation({ title: 'Registered user view the completed paypal sale details ' })
    @ApiResponse({
        status: 200,
        description: 'Paypal sale details will be returned to registered user for the completed sales',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('viewer')
    @ApiBearerAuth()
    @Get('paypal/sale')
    getPaypalSaleInfo(){

    }

    @ApiOperation({ title: 'Registered user initiate the refund for the paypal payments already made ' })
    @ApiResponse({
        status: 200,
        description: 'Refund will be processed for the compelted paypal sale',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('viewer')
    @ApiBearerAuth()
    @Post('paypal/refund')
    processPaypalRefund(){

    }
}
