import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { IAuthService, JwtOptions } from './interfaces/IAuthService';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../../common/exceptions/user-notfound.exception';
import { User } from '../users/user.entity';
import { TOKEN_USER_REPOSITORY } from '../../common/config/database.tokens.constants';

@Component()
export class AuthService implements IAuthService {
  private _options: JwtOptions = {
    algorithm: 'HS256',
    expiresIn: '2 days',
    jwtid: process.env.JWT_ID || '',
  };

  public constructor(@Inject(TOKEN_USER_REPOSITORY) private readonly usersRepository: Repository<User>) {}

  get options(): JwtOptions {
    return this._options;
  }

  set options(value: JwtOptions) {
    this._options.algorithm = value.algorithm;
  }

  public async sign(credentials: { username_email: string; password: string }): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: {
        name: credentials.username_email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    // Hype-Fake!
    if (user.password !== credentials.password) {
      throw new UserNotFoundException();
    }
    const payload = {
      id: user.id,
      name: user.name,
    };

    return await jwt.sign(payload, process.env.JWT_KEY || 'Secret', this._options);
  }
}
