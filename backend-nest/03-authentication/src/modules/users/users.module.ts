import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { heroesProviders } from './users.providers';

@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [UsersService, ...heroesProviders],
})
export class UsersModule {}
