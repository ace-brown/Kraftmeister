import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Throttle } from '@nestjs/throttler';
import { Public } from './decorators/public.decorator';
import { UsersService } from '../users/users.service';

@Throttle({ default: { ttl: 60000, limit: 10 } })
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /** Returns the authenticated user's profile (email, role, companyName) derived from the JWT. */
  @Get('me')
  findMe(@CurrentUser() user: { userId: string }) {
    return this.usersService.getMe(user.userId);
  }

  /** Creates a new company and admin user, returns access + refresh tokens. */
  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /** Validates credentials and returns access + refresh tokens. */
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** Issues a new access + refresh token pair using a valid refresh token. */
  @Public()
  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refresh(token);
  }

  /** Revokes the refresh token for the authenticated user, ending their session. */
  @Post('logout')
  logout(@CurrentUser() user: { userId: string }) {
    return this.authService.logout(user.userId);
  }
}
