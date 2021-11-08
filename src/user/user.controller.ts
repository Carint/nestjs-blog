import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';
import { Auth } from 'src/common/decorators';
import { AppResource } from 'src/app.roles';
import { UseRoles } from 'nest-access-control';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // Retorno de todos los usuario
  @Get()
  @ApiOperation({ summary: 'Obtener de todos los usuarios' })
  async getMany() {
    return await this._userService.getMany();
  }

  // Retornar un usuario por id
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._userService.getOne(id);
  }

  // Crear un nuevo usuario
  @ApiOperation({ summary: 'Creación de un nuevo usuario' })
  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    return await this._userService.createOne(dto);
  }

  // Editar un usuario por id
  @Auth()
  @Put(':id')
  @ApiOperation({ summary: 'Editar un usuario' })
  async editOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: EditUserDto,
  ) {
    return await this._userService.editOne(id, dto);
  }

  // Eliminar un usuario por id
  @Auth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._userService.deleteOne(id);
  }
}
