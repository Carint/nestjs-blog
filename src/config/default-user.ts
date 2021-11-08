import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';

import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } from './constants';
import { User } from 'src/user/entities';
import { AppRoles } from '../app.roles';

export const setDefaultUser = async (config: ConfigService) => {
  const userRepository = getRepository<User>(User);

  const defaultUser = await userRepository
    .createQueryBuilder()
    .where('email = :email', { email: config.get<string>(DEFAULT_USER_EMAIL) })
    .getOne();

  if (!defaultUser) {
    const adminUser = userRepository.create({
      email: config.get<string>(DEFAULT_USER_EMAIL),
      password: config.get<string>(DEFAULT_USER_PASSWORD),
      roles: [AppRoles.ADMIN],
    });

    return await userRepository.save(adminUser);
  }
};
