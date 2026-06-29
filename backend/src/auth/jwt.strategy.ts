import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.token, // 🔥 COOKIE
      ]),
      secretOrKey: process.env.JWT_SECRET || 'MY_SECRET_KEY',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}