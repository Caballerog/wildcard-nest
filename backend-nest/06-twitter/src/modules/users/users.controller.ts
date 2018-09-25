import { Get, Controller, Param, Body, Put, Delete, Post, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { USER_ANONYMOUS, USER_REGISTERED, USER_ADMIN } from '../../common/config/constants';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles([USER_ANONYMOUS])
  @Get()
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Roles([USER_ANONYMOUS])
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    const userID = parseInt(id, 10); //Pipe
    return this.usersService.findById(userID);
  }

  @Roles([USER_ANONYMOUS])
  @Get('search/:name')
  findByName(@Param('name') name: string): Promise<User[]> {
    return this.usersService.findByName(name);
  }

  @Roles([USER_REGISTERED])
  @Put()
  updateById(@Body('id') id: string, @Body('name') name: string): Promise<User> {
    const userID = parseInt(id, 10);
    return this.usersService.updateById(userID, name);
  }

  @Roles([USER_REGISTERED])
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<User> {
    const userID = parseInt(id, 10);
    return this.usersService.deleteById(userID);
  }

  @Roles([USER_ADMIN])
  @Post()
  create(@Body('name') name: string): Promise<User> {
    return this.usersService.create(name);
  }
}
