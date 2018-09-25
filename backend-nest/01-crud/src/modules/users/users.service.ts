import { Component } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UserNotFoundException } from '../../common/exceptions/user-notfound.exception';
import { UserRepeatException } from '../../common/exceptions/user-repeat.exceptions';

@Component()
export class UsersService {
  private FAKE_ID = 21;
  private readonly users: User[] = [
    { id: 11, name: 'Mr. Nice', password: '123456' },
    { id: 12, name: 'Narco', password: '123456' },
    { id: 13, name: 'Bombasto', password: '123456' },
    { id: 14, name: 'Celeritas', password: '123456' },
    { id: 15, name: 'Magneta', password: '123456' },
    { id: 16, name: 'RubberMan', password: '123456' },
    { id: 17, name: 'Dynama', password: '123456' },
    { id: 18, name: 'Dr IQ', password: '123456' },
    { id: 19, name: 'Magma', password: '123456' },
    { id: 20, name: 'Tornado', password: '123456' },
  ];

  findAll(): User[] {
    return this.users;
  }
  findById(userID: number): User {
    const user = this.users.find(hero => hero.id === userID);
    if (!user) {
      throw new UserNotFoundException(userID);
    }
    return user;
  }
  findByName(name: string): User[] {
    const users = this.users.filter(user => users.name.includes(name));
    if (!users.length) {
      throw new UserNotFoundException();
    }
    return users;
  }
  updateById(userID: number, name: string): User {
    const user = this.findById(userID);
    user.name = name;
    return user;
  }
  deleteById(userID: number): User {
    const userIndex = this.users.findIndex(user => hero.id === userID);
    if (userIndex === -1) {
      throw new UserNotFoundException(userID);
    }
    const hero = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return hero;
  }
  create(name: string): User {
    const userFound = this.users.find(userInList => userInList.name === name);
    if (userFound) {
      throw new UserRepeatException(userFound);
    }
    const user: User = {
      name,
      id: this.FAKE_ID,
    };
    this.users.push(user);
    this.FAKE_ID = this.FAKE_ID + 1;
    return user;
  }
}
