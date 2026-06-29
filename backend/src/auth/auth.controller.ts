import {
  Controller,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }

  // REGISTER
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(
      body.email,
      body.password,
      body.name,
    );
  }

  // LOGIN
  @Post('login')
  async login(
    @Body() body: any,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.login(
      body.email,
      body.password,
    );

    const token = this.jwtService.sign(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { message: 'Logged out successfully' };
  }
}