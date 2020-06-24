import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(){
    this.userService.updateUser();
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string){
    this.userService.deleteUser(id);
  }
}
