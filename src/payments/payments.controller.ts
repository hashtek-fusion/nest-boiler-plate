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
    Logger,
    UseGuards,
    Req,
} from '@nestjs/common';
import { apiPath } from '../common/api';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PaymentsService } from './payments.service';
import { PaymentsDto } from '../dto/paypal/payments.dto';
import { RefundDto } from '../dto/paypal/refund.dto';

@ApiUseTags('Manage Payments')
@UseGuards(RolesGuard)
@Controller(apiPath(1, 'payments'))
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

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
    async authorizePaypalPayment(@Body() paymentsDto: PaymentsDto, @Req() req: any) {
        const userId = req.user._id;
        try {
            return await this.paymentsService.makePaypalPayment(paymentsDto, userId);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Registered user can view the completed paypal payment details ' })
    @ApiResponse({
        status: 200,
        description: 'Paypal payment details will be returned to registered user with status of the payment',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('viewer')
    @ApiBearerAuth()
    @Get('paypal/payment')
    async getPaypalPaymentInfo(@Param('paymentId') paymentId: string) {
        try {
            return await this.paymentsService.getPaypalPaymentDetails(paymentId);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
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
    @Roles('admin')
    @ApiBearerAuth()
    @Get('paypal/sale')
    async getPaypalSaleInfo(@Param('saleId') saleId: string) {
        try {
            return await this.paymentsService.getPaypalSaleDetails(saleId);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    @ApiOperation({ title: 'Registered user initiate the refund for the paypal payments already made ' })
    @ApiResponse({
        status: 200,
        description: 'Refund will be processed for the completed paypal sale',
    })
    @ApiResponse({
        status: 500,
        description: 'Unexpected Server error',
    })
    @Roles('admin')
    @ApiBearerAuth()
    @Post('paypal/refund')
    async processPaypalRefund(@Body() refundDto: RefundDto) {
        try {
            return await this.paymentsService.processPaypalRefund(refundDto);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
