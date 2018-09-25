import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TestingModule } from '@nestjs/testing/testing-module';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from '../../common/exceptions/user-notfound.exception';
import { TOKEN_USER_REPOSITORY } from '../../common/config/database.tokens.constants';

let testingModule: TestingModule;
let service: UsersService;
let spyRepository: Repository<User>;

describe('Users Service', () => {
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      components: [
        UsersService,
        {
          provide: TOKEN_USER_REPOSITORY,
          useFactory: () => ({
            find: jest.fn(),
            findOneById: jest.fn(() => true),
            clear: jest.fn(),
            insert: jest.fn(() => Promise.resolve(true)),
          }),
        },
      ],
    }).compile();

    service = testingModule.get(UsersService);
    spyRepository = testingModule.get(TOKEN_USER_REPOSITORY);
  });

  it('#findAll should find all heroes', () => {
    service.findAll();

    expect(spyRepository.find).toHaveBeenCalledTimes(1);
  });

  describe('#findById', () => {
    it('should return an exception if no hero was found', async () => {
      spyRepository.findOneById = jest.fn();

      await expect(service.findById(1)).rejects.toBeInstanceOf(UserNotFoundException);
    });

    it('should not return an exception if a hero was found', () => {
      service.findById(1);

      expect(spyRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(spyRepository.findOneById).toHaveBeenCalledWith(1);
    });
  });
});
