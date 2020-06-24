import { Controller, Get, Param, HttpException, HttpStatus, Post, Put, Delete } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private prismaService: PrismaService, private authService: AuthService, private userService: UsersService) {}
  
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(){
    this.userService.createUser();
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
