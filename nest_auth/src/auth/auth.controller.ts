import { Role } from './../authentication/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: any) {
    return this.authService.signIn(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  singnUp(
    @Body()
    signInDto: {
      email: string;
      password: string;
      role: 'admin' | 'user';
    },
  ) {
    return this.authService.signUp(signInDto);
  }
}
