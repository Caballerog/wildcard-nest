import { Connection, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { TOKEN_USER_REPOSITORY, DBCONNECTION_TOKEN } from '../../common/config/database.tokens.constants';
export const AuthProviders = [
  {
    provide: TOKEN_USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DBCONNECTION_TOKEN],
  },
];
