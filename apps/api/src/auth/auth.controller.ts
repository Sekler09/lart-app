import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from './services/cookie.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { User } from '@repo/api/types/users';
import {
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
  GetMeResponse,
} from '@repo/api/types/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignUpResponse> {
    const { accessToken, user } = await this.authService.signUp(body);
    this.cookieService.setToken(res, accessToken);
    const { password, ...profile } = user;
    return profile;
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponse> {
    const { accessToken, user } = await this.authService.signIn(body);
    this.cookieService.setToken(res, accessToken);
    const { password, ...profile } = user;
    return profile;
  }

  @Post('/signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  signOut(@Res({ passthrough: true }) res: Response): SignOutResponse {
    this.cookieService.clearToken(res);
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: Request): GetMeResponse {
    const { password, ...user } = req.user as User;
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Query('error') error?: string, // Google might pass error in query
  ) {
    if (error || !req.user) {
      // Redirect to a frontend error page or show an error
      const frontendErrorUrl = `${this.configService.get('FRONTEND_URL')}/signin?error=google_auth_failed`;
      return res.redirect(frontendErrorUrl);
    }

    const authenticatedUser = req.user as User;

    const accessToken = await this.authService.generateJwtToken(
      authenticatedUser.id,
      authenticatedUser.email,
    );
    this.cookieService.setToken(res, accessToken);

    const frontendRedirectUrl = this.configService.get('FRONTEND_URL');
    res.redirect(frontendRedirectUrl);
  }
}
