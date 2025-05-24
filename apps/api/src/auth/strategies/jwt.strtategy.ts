import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { User } from '@repo/api/types/users';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly cookieService: CookieService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieService.getToken]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }): Promise<Omit<User, 'password'>> {
    // 'sub' is the userId we stored in the JWT payload
    const user = await this.usersService.findUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid.');
    }
    // The object returned here is attached to req.user
    return user;
  }
}
