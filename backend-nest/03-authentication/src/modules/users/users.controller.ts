import { Get, Controller, Param, Body, Put, Delete, Post } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  users(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    const userID = parseInt(id, 10); //Pipe
    return this.usersService.findById(userID);
  }
  @Get('search/:name')
  findByName(@Param('name') name: string): Promise<User[]> {
    return this.usersService.findByName(name);
  }
  @Put()
  updateById(@Body('id') id: string, @Body('name') name: string): Promise<User> {
    const userID = parseInt(id, 10);
    return this.usersService.updateById(userID, name);
  }
  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<User> {
    const userID = parseInt(id, 10);
    return this.usersService.deleteById(userID);
  }
  @Post()
  create(@Body('name') name: string): Promise<User> {
    return this.usersService.create(name);
  }
}
