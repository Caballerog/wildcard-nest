import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

export const heroesProviders = [
  {
    provide: 'UsersRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
];
