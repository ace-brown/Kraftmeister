import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        companyId: dto.companyId,
        email: dto.email,
        passwordHash: dto.password, // caller is responsible for hashing before passing
        role: dto.role,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  /** Fetches the authenticated user's profile with company name, excluding sensitive fields like passwordHash. */
  async getMe(id: string) {
    const me = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        companyId: true,
        email: true,
        role: true,
        company: { select: { name: true } },
      },
    });

    if (!me) throw new NotFoundException('User not found');

    return {
      userId: me.id,
      companyId: me.companyId,
      email: me.email,
      role: me.role,
      companyName: me.company.name,
    };
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.email && { email: dto.email }),
        ...(dto.password && { passwordHash: dto.password }),
        ...(dto.role && { role: dto.role }),
      },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
