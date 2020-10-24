import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UsersDTO } from './users.models';

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

  async updateUser(id: number, user: UsersDTO): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      }
    });
  }

  async deleteUser(id: number): Promise<User>{
    return await this.prismaService.user.delete({
      where: {
        id: id
      }
    })
  }
}