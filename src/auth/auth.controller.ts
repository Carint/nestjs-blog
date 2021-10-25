import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from 'src/user/entities';

import { DataUser } from '../common/decorators';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // Inicio de sesión
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@DataUser() user: User) {
    const dataUser = await this._authService.login(user);

    return {
      message: 'Inicio de sesión existoso',
      dataUser,
    };
  }

  // Perfil del usuario
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'Ruta del profile';
  }

  // Refresh token
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refreshToken(@DataUser() user: User) {
    const dataUser = await this._authService.login(user);

    return {
      message: 'Refresh existoso',
      dataUser,
    };
  }
}
