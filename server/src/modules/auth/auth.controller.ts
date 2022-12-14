import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CheckAuthDto } from './dto/check-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signUp(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  async signIn(@Body() checkAuthDto: CheckAuthDto) {
    return this.authService.signIn(checkAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  test() {
    return 'something';
  }
}
