import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService} from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { LoginDto } from './auth/auth.models';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('auth/create')
  async create(@Body() loginDto : LoginDto) {
    const hash =  await this.authService.encryptPwd(loginDto.password);
    return this.usersService.createUser(loginDto.email,hash);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
