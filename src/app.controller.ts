import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAccessToken } from './auth/dto/jwt-access-token.iterface';
import { User } from './users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<JwtAccessToken> {
    const token = await this.authService.login(req.user);
    return token;
  }
}
