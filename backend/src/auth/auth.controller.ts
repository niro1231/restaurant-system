import {
  Controller,
  Post,
  Body,
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
  async login(@Body() body: any) {
    const user = await this.authService.login(
      body.email,
      body.password,
    );

    const token = this.jwtService.sign(user);

    return {
      message: 'Login successful',
      accessToken: token,
      userId: user.userId,
      email: user.email,
    };
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out successfully' };
  }
}