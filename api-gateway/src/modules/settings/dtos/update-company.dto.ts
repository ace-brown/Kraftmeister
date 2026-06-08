import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  vatId?: string;

  @IsOptional()
  @IsNumber()
  defaultVatRate?: number;

  @IsOptional()
  @IsNumber()
  paymentTermsDays?: number;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  bankIban?: string;

  @IsOptional()
  @IsString()
  bankBic?: string;
}
