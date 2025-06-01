import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User, UserProfile } from '@repo/api/types/users';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async createUser(userDto: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.prisma.user.create({ data: userDto });
  }

  async updateUser(userId: number, updateUserDto: Partial<Omit<User, 'id'>>) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async deleteUser(userId: number) {
    return await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findUserByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async createUserWithGoogle(data: { email: string; googleId: string }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        googleId: data.googleId,
      },
    });
  }

  async getUsersList(): Promise<UserProfile[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        googleId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
