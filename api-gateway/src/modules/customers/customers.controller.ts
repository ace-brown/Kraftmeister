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

  /** Returns all customers for the company, optionally filtered by a search term across name, email, and phone. */
  @Get()
  findAllCustomers(@Query('search') search?: string) {
    return this.customersService.findAll(search);
  }

  /** Returns a single customer by ID, or 404 if not found. */
  @Get(':id')
  findCustomerById(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  /** Creates a new customer under the current company. */
  @Post()
  createCustomer(@Body() customerDto: CreateCustomerDto) {
    return this.customersService.create(customerDto);
  }

  /** Partially updates a customer's details. */
  @Patch(':id')
  updateCustomer(
    @Body() customerDto: UpdateCustomerDto,
    @Param('id') id: string,
  ) {
    return this.customersService.update(customerDto, id);
  }

  /** Soft-deletes a customer by setting deletedAt — they are excluded from future queries. */
  @Delete(':id')
  @HttpCode(204)
  deleteCustomer(@Param('id') id: string) {
    return this.customersService.delete(id);
  }
}
