import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { heroesProviders } from './users.providers';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';
import { TwitterService } from './twitter.service';

const ROUTES_EXCEPT = ['/users', '/users/search'];
@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [UsersService, TwitterService, ...heroesProviders],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .with(ROUTES_EXCEPT)
      .forRoutes(UsersController);
  }
}
