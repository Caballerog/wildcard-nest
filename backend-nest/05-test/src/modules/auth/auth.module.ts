import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthProviders } from './auth.providers';
import { User } from '../users/user.entity';
import { Connection } from 'typeorm';

@Module({
  controllers: [AuthController],
  components: [...AuthProviders, AuthService],
  modules: [DatabaseModule],
  exports: [AuthService],
})
export class AuthModule {}
