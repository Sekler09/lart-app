import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}
