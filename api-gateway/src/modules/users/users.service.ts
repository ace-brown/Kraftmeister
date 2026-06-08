import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /** Creates a new user — caller is responsible for hashing the password before passing it. */
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

  /** Returns all users in the system. */
  findAll() {
    return this.prisma.user.findMany();
  }

  /** Returns a single user by ID, throwing 404 if not found. */
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

  /** Looks up a user by email address, returning null if not found. Used by auth for login validation. */
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /** Partially updates a user's email, password hash, or role. */
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

  /** Permanently deletes a user by ID. */
  async remove(id: string) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
