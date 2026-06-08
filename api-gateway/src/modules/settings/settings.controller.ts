import { Body, Controller, Get, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SettingsService } from './settings.service';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@ApiBearerAuth()
@Controller('settings')
export class SettingsController {
  constructor(private settingService: SettingsService) {}

  /** Returns the authenticated company's profile, invoice defaults, and the user's email in one payload. */
  @Get()
  getSettings(@CurrentUser() user: { userId: string; companyId: string }) {
    return this.settingService.getSettings(user.userId, user.companyId);
  }

  /** Updates the company's profile and invoice default fields (name, address, VAT ID, bank details, etc.). */
  @Patch('/company')
  updateCompany(
    @CurrentUser() user: { companyId: string },
    @Body() companyDto: UpdateCompanyDto,
  ) {
    return this.settingService.updateCompany(user.companyId, companyDto);
  }

  /** Updates the authenticated user's email and/or password after verifying their current password. */
  @Patch('/account')
  updateAccount(
    @CurrentUser() user: { userId: string },
    @Body() accountDto: UpdateAccountDto,
  ) {
    return this.settingService.updateAccount(user.userId, accountDto);
  }

  /** Uploads a company logo to MinIO and saves its URL — not yet implemented. */
  @Post('/company/logo')
  @UseInterceptors(FileInterceptor('file'))
  uploadLogo(@UploadedFile() _file: Express.Multer.File) {
    // TODO: call minioService.uploadLogo and save URL to company.logoUrl
    return { message: 'Logo upload not yet implemented' };
  }
}
