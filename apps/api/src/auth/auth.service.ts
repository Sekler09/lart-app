import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './services/password.service';
import { ConfigService } from '@nestjs/config';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.signAsync(payload);
  }

  async signUp({ email, password }: SignUpDto) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException({
        username: 'User with such email already exists',
      });
    }

    const hash = await this.passwordService.getHash(password);

    const newUser = await this.usersService.createUser({
      email,
      password: hash,
      googleId: null,
    });

    const accessToken = await this.generateJwtToken(newUser.id, newUser.email);

    return { accessToken, user };
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isPasswordMatching = await this.passwordService.compareHash(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const accessToken = await this.generateJwtToken(user.id, user.email);
    return { accessToken, user };
  }

  async validateUserWithGoogle(details: { googleId: string; email: string }) {
    let user = await this.usersService.findUserByGoogleId(details.googleId);

    if (user) {
      return user;
    }

    const existingUserByEmail = await this.usersService.findByEmail(
      details.email,
    );

    if (existingUserByEmail) {
      const updatedUser = await this.usersService.updateUser(
        existingUserByEmail.id,
        {
          googleId: details.googleId,
        },
      );
      return updatedUser;
    }

    const newUser = await this.usersService.createUserWithGoogle({
      email: details.email,
      googleId: details.googleId,
    });
    return newUser;
  }
}
