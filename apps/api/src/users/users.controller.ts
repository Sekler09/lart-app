import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { GetUsersListResponse } from '@repo/api/types/auth';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUsersList(): Promise<GetUsersListResponse> {
    return this.usersService.getUsersList();
  }
}
