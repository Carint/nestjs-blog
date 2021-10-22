import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Se obtiene el usuario
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return req.user;
  }

  @Get('profile')
  profile() {
    return 'Ruta del profile';
  }
}
