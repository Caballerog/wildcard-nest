import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Repository } from 'typeorm/repository/Repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './interfaces/user.interface';

let testingModule: TestingModule;
let controller: UsersController;
let spyService: UsersService;

describe('Users Controller', () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UsersController],
      components: [
        {
          provide: UsersService,
          useFactory: () => ({
            create: jest.fn(),
            findAll: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = testingModule.get(UsersController);
    spyService = testingModule.get(UsersService);
  });

  it('#heroes should call to findAll method of heroes service', () => {
    controller.users();

    expect(spyService.findAll).toHaveBeenCalledTimes(1);
  });

  it('#create should call to create method of heroes service', () => {
    const usersMocked = 'Users mocked!';

    controller.create(usersMocked);

    expect(spyService.create).toHaveBeenCalledTimes(1);
    expect(spyService.create).toHaveBeenCalledWith(usersMocked);
  });
});
