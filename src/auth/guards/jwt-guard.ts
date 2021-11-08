import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // console.log('Info del user: ', user);
    if (err || !user) {
      throw err || new UnauthorizedException('Usuario no autorizado');
    }

    return user;
  }
}
