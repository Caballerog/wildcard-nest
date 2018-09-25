import { createConnection } from 'typeorm';
import { DBCONNECTION_TOKEN } from '../../common/config/database.tokens.constants';

export const databaseProviders = [
  {
    provide: DBCONNECTION_TOKEN,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'toor',
        database: 'heroes',
        entities: [__dirname + '/../**/*entity.{ts,js}'],
        synchronize: true,
        logging: true,
      }),
  },
];
