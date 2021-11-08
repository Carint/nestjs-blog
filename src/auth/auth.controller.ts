import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from 'src/user/entities';

import { Auth, DataUser } from '../common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { LocalAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  // Inicio de sesión
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Inicio de sesión existoso',
  //   type: LoginDto,
  // })
  async login(@Body() loginDto: LoginDto, @DataUser() user: User) {
    const dataUser = await this._authService.login(user);

    return {
      message: 'Inicio de sesión existoso',
      dataUser,
    };
  }

  // Perfil del usuario
  @ApiOperation({ summary: 'Perfil del usuario' })
  @Get('profile')
  @Auth()
  profile(@DataUser() user: User) {
    return {
      ...user,
    };
  }

  // Refresh token
  @Auth()
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh del Token' })
  async refreshToken(@DataUser() user: User) {
    const dataUser = await this._authService.login(user);

    return {
      message: 'Refresh existoso',
      dataUser,
    };
  }
}
