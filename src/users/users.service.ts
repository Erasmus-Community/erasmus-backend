import { Param, Get, HttpException, HttpStatus, Post, Put, Delete, Controller } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersService {

  constructor(private prismaService: PrismaService) {}
  
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {

    let userId = parseInt(id);
    if(isNaN(userId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
    
    return await this.prismaService.user.findOne({
      where: {
        id: userId
      }
    });
  }

  @Post('')
  async createUser(){
    return await this.prismaService.user.create({
      data: {
        name: '',
        email: '',
        password: ''
      }
    });
  }

  @Put(':id')
  async updateUser(){
    return await this.prismaService.user.update({
      where: {},
      data: {
        name: '',
        email: '',
        password: ''
      }
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string){
    let userId = parseInt(id);
    if(isNaN(userId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
    
    return await this.prismaService.user.delete({
      where: {
        id: userId
      }
    })
  }
}