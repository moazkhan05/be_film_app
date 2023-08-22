import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { CreateAuthDto } from './dto/create-auth.dto';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() user: CreateAuthDto) {
    return this.authService.registerUser(user);
  }

  
  @Public()
  @Post('login')
  async login(@Body() user : GenerateTokenDto) {
    return this.authService.loginUser(user);
  }

  @Get('checkUser')
  async checkUser(){
    return 'success'
  }
}
