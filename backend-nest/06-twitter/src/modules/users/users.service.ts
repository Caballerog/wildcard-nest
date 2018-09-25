import { Component, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from '../../common/exceptions/user-notfound.exception';
import { UserRepeatException } from '../../common/exceptions/user-repeat.exceptions';
import { Repository } from 'typeorm';
import { USER_REGISTERED, USER_ADMIN } from '../../common/config/constants';
import { TOKEN_USER_REPOSITORY } from '../../common/config/database.tokens.constants';

@Component()
export class UsersService {
  constructor(@Inject(TOKEN_USER_REPOSITORY) private readonly usersRepository: Repository<User>) {
    this.recreateFakeData();
  }
  private recreateFakeData() {
    this.usersRepository.clear();
    this.fake_heroes.forEach(user => this.usersRepository.insert(user).catch(() => {}));
  }
  private readonly fake_heroes: User[] = [
    { id: 11, name: 'Mr. Nice', password: '123456', rol: USER_REGISTERED },
    { id: 12, name: 'Narco', password: '123456', rol: USER_ADMIN },
    { id: 13, name: 'Bombasto', password: '123456', rol: USER_REGISTERED },
    { id: 14, name: 'Celeritas', password: '123456', rol: USER_REGISTERED },
    { id: 15, name: 'Magneta', password: '123456', rol: USER_REGISTERED },
    { id: 16, name: 'RubberMan', password: '123456', rol: USER_REGISTERED },
    { id: 17, name: 'Dynama', password: '123456', rol: USER_REGISTERED },
    { id: 18, name: 'Dr IQ', password: '123456', rol: USER_REGISTERED },
    { id: 19, name: 'Magma', password: '123456', rol: USER_REGISTERED },
    { id: 20, name: 'Tornado', password: '123456', rol: USER_REGISTERED },
  ];

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findById(userID: number): Promise<User> {
    const user = await this.usersRepository.findOneById(userID);
    if (!user) {
      throw new UserNotFoundException(userID);
    }
    return user;
  }
  async findByName(name: string): Promise<User[]> {
    const [users, usersCount] = await this.usersRepository
      .createQueryBuilder('users')
      .select()
      .where(`users.name like '%${name}%'`)
      .getManyAndCount();

    if (usersCount === 0) {
      throw new UserNotFoundException();
    }
    return users as User[];
  }
  async updateById(userID: number, name: string): Promise<User> {
    const user: User = {
      name,
      id: userID,
    };
    await this.usersRepository.updateById(userID, user);
    return user;
  }
  async deleteById(userID: number): Promise<User> {
    const user = await this.findById(userID);
    await this.usersRepository.deleteById(userID);
    return user;
  }
  async create(name: string): Promise<User> {
    try {
      await this.usersRepository.insert({ name });
    } catch {
      throw new UserRepeatException({ name } as User);
    }
    return this.findOneByName(name);
  }
  findOneByName(name): Promise<User> {
    return this.usersRepository.findOne({
      name,
    });
  }
}
