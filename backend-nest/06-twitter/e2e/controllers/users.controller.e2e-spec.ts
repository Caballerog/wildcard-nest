import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';

import { UsersModule } from '../../src/modules/users/users.module';
import { createConnection, Connection } from 'typeorm';
import { INestApplication } from '@nestjs/common/interfaces';
import { RolesGuard } from '../../src/common/guards/roles.guard';

let agent: request.SuperTest<request.Test>;
let db: Connection;
let app: INestApplication;

describe('Users Controller', () => {
  beforeAll(async () => {
    db = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'toor',
      database: 'heroes',
      entities: [`${process.cwd()}/src/**/*entity.{ts,js}`],
      synchronize: true,
    });
  });

  const server = express();
  server.use(bodyParser.json());

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      modules: [UsersModule],
    })
      .overrideComponent('DbConnectionToken')
      .useValue(db)
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = testingModule.createNestApplication(server);
    agent = request(server);

    await app.init();
  });

  it('/GET users should return an array of users', () => {
    return agent
      .get('/users')
      .expect(200)
      .expect(({ body: users }) => expect(users).toBeInstanceOf(Array));
  });

  it('/GET heroes/:id should return a hero', () => {
    return agent
      .get('/users/12')
      .expect(200)
      .expect(({ body: user }) => expect(user).not.toBeInstanceOf(Array));
  });

  it('/GET users/search/:name should return an hero searched by name', () => {
    const userName = 'Tornado';
    return agent
      .get(`/heroes/search/${userName}`)
      .expect(200)
      .expect(({ body: user }) => expect(user).toEqual(userName));
  });
});
