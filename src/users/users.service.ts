import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}
  
  async getUser(id: number): Promise<User> {
    return await this.prismaService.user.findOne({
      where: {
        id: id
      }
    });
  }

  async createUser(email: string, password: string): Promise<User> {
    return await this.prismaService.user.create({
      data: {
        name: '',
        email: email,
        password: password
      }
    });
  }

  async updateUser(): Promise<User> {
    return await this.prismaService.user.update({
      where: {},
      data: {
        name: '',
        email: '',
        password: ''
      }
    });
  }

  async deleteUser(id: number){
    return await this.prismaService.user.delete({
      where: {
        id: id
      }
    })
  }
}