import { RolesBuilder } from 'nest-access-control';

// Enum de roles
export enum AppRoles {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

// Enum de Resources
export enum AppResource {
  USER = 'USER',
  POST = 'POST',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant('AUTHOR') // Roles de Autor
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.POST])
  .updateOwn([AppResource.POST])
  .deleteOwn([AppResource.POST])
  .grant('ADMIN') // Roles del Admin
  .extend('AUTHOR')
  .createAny([AppResource.USER])
  .updateAny([AppResource.POST, AppResource.USER])
  .deleteAny([AppResource.POST, AppResource.USER]);
