import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from 'src/user/entities';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  // Validación del email y password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this._userService.getOneForEmail(email);

    if (user && (await compareSync(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // Inicio de sesión
  async login(user: User) {
    const { id, ...rest } = user;
    const payload = { sub: id };

    return {
      user: rest,
      token: this._jwtService.sign(payload),
    };
  }
}
