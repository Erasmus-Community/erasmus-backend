import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private prismaService: PrismaService) {}
  
  async getUser(id: string): Promise<User> {
    const userId = this.parseId(id);

    return await this.prismaService.user.findOne({
      where: {
        id: userId
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

  async deleteUser(id: string){
    const userId = this.parseId(id);

    return await this.prismaService.user.delete({
      where: {
        id: userId
      }
    })
  }

  private parseId(id: string) {
    let userId = parseInt(id);
    if(isNaN(userId)){ throw new HttpException({status: HttpStatus.NOT_FOUND, error: ":id must be an Integer"}, HttpStatus.NOT_FOUND) }
    return userId;
  }
}