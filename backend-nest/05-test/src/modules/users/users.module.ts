import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { heroesProviders } from './users.providers';
import { AuthMiddleware } from '../../common/middlewares/auth.middleware';

const ROUTES_EXCEPT = ['/users', '/users/search'];
@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [UsersService, ...heroesProviders],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .with(ROUTES_EXCEPT)
      .forRoutes(UsersController);
  }
}
