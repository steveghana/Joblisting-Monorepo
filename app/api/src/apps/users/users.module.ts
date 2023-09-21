import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
// import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
