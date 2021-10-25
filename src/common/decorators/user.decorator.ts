import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities';

export const DataUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;

    return data ? user && user[data] : user;
  },
);
