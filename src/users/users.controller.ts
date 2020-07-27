import { Controller, Get, Param, Post, Put, Delete, ParseIntPipe, UseGuards, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersDTO } from './users.models';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(){
    this.userService.updateUser();
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number){
    this.userService.deleteUser(id);
  }
}
