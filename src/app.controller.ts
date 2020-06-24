import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService} from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService, private usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/create')
  async create(@Request() req) {
    const hash =  await this.authService.encryptPwd(req.body.password);
    return this.usersService.createUser(req.body.email,hash);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
