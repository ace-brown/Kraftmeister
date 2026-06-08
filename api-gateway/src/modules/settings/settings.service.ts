import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string, companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    return { ...company, email: user?.email };
  }

  updateCompany(companyId: string, CompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id: companyId },
      data: CompanyDto,
    });
  }

  /** Updates the authenticated user's email and/or password. Requires current password verification before allowing a password change. */
  async updateAccount(userId: string, accountDto: UpdateAccountDto) {
    let newHash: string | undefined;

    if (accountDto.newPassword) {
      if (!accountDto.currentPassword) {
        throw new BadRequestException('Current password is required to set a new password');
      }

      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      const valid = await bcrypt.compare(accountDto.currentPassword, user!.passwordHash);
      if (!valid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      newHash = await bcrypt.hash(accountDto.newPassword, 12);
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(accountDto.email && { email: accountDto.email }),
        ...(newHash && { passwordHash: newHash }),
      },
      select: { id: true, email: true, role: true },
    });
  }
}
