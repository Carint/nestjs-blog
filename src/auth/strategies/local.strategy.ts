import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'email', // 'username'
      passwordField: 'password', // 'passport'
    });
  }

  async validate(email: string, password: string) {
    const user = await this._authService.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException('Usuario o contraseña no son correctos');

    return user;
  }
}
