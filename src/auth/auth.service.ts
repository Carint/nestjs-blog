import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly _userService: UserService) {}

  // Validación del email y password
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this._userService.getOneForEmail(email);

    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
