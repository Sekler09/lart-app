import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookieService {
  static CookieName = process.env.COOKIE_NAME || 'access_token';

  setToken(res: Response, token: string) {
    res.cookie(CookieService.CookieName, token, {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  getToken(req: Request): string | null {
    if (req.cookies && req.cookies[CookieService.CookieName]) {
      return req.cookies[CookieService.CookieName];
    }
    return null;
  }

  clearToken(res: Response) {
    res.clearCookie(CookieService.CookieName);
  }
}
