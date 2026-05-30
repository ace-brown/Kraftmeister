import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const company = await this.prisma.company.create({
      data: { name: dto.companyName },
    });

    const user = await this.prisma.user.create({
      data: { companyId: company.id, email: dto.email, passwordHash, role: 'ADMIN' },
    });

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.passwordHash);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokens(user);
  }

  async refresh(token: string) {
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const stored = await this.cache.get<string>(`refresh:${payload.sub}`);
    if (!stored || stored !== token) {
      throw new UnauthorizedException('Refresh token expired or revoked');
    }

    const user = await this.usersService.findById(payload.sub);
    return this.issueTokens(user);
  }

  async logout(userId: string) {
    await this.cache.del(`refresh:${userId}`);
    return { message: 'Logged out' };
  }

  private async issueTokens(user: { id: string; companyId: string; role: string }) {
    const payload: JwtPayload = {
      sub: user.id,
      companyId: user.companyId,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.cache.set(`refresh:${user.id}`, refreshToken, REFRESH_TTL_MS);

    return { accessToken, refreshToken };
  }
}
