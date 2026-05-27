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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAllCustomers() {
    return this.customersService.findAll();
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
