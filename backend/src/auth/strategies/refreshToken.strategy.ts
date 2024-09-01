import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ParsedQs } from 'qs';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  authenticate(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    options?: any,
  ) {
    console.log('🚀 ~ options:', options);
    console.log('🚀 ~ req:', req);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const id = Number(req.get('userid'));
    this.validate(req, id);

    return {
      refreshToken,
      id,
    };
  }
  validate(req: Request, payload: any) {
    console.log('🚀 ~ validate ~ payload:', payload);
    console.log('🚀 ~ validate ~ req:', req);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
