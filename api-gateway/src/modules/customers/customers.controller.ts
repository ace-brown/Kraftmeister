import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAllCustomers(@Query('search') search?: string) {
    return this.customersService.findAll(search);
  }

  @Get(':id')
  findCustomerById(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  createCustomer(@Body() customerDto: CreateCustomerDto) {
    return this.customersService.create(customerDto);
  }

  @Patch(':id')
  updateCustomer(
    @Body() customerDto: UpdateCustomerDto,
    @Param('id') id: string,
  ) {
    return this.customersService.update(customerDto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteCustomer(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
