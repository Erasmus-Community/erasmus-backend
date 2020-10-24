import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService} from './auth/auth.service';
import { UsersService } from './users/users.service';
import { LoginDto } from './auth/auth.models';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Post('auth/create')
  async create(@Body() loginDto : LoginDto): Promise<any> {
    const hash =  await this.authService.encryptPwd(loginDto.password);
    return this.usersService.createUser(loginDto.email,hash);
  }
}
