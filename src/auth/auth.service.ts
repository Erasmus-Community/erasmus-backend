import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import *  as bcrypt from 'bcrypt';
import { User } from '@prisma/client';


const saltRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  /*
  * Validates the User 
  * @returns - the user info if validation is correct
  */
  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.prismaService.user.findOne({
      where: {
        email: email
      }
    });
    if(user === null){ return null; }
    
    const match = this.checkPwd(pass,user.password);
    if(match){
      return user;
    }

    return null;
  }

  /*
  * logins the user and returns a Bearer JWT to be used on the REST APIs
  */
  async login(user: any) {
    const existingUser = await this.validateUser(user.email,user.password);
    const payload = { username: existingUser.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /*
  * Encrypties the password to a hash to be stored in the DB
  */
  async encryptPwd(data: string): Promise<string>{
    const hash = await bcrypt.hash(data,saltRounds);
    return hash;
  }
  
  /*
  * Compares pwd with the userHash to see they are equal.
  */
  async checkPwd(pwd: string, userHash: string): Promise<boolean>{
    const match  = await bcrypt.compare(pwd, userHash);
    return match === true;
  }
}