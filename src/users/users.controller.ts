import { Controller, Get, Param, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
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
  async updateUser(id: number, user: UsersDTO): Promise<User>{
    return this.userService.updateUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
    return this.userService.deleteUser(id);
  }
}
