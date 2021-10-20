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
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { CreateUserDto, EditUserDto } from '../dtos';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // Retorno de todos los usuario
  @Get()
  async getMany() {
    return await this._userService.getMany();
  }

  // Retornar un usuario por id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._userService.getOne(id);
  }

  // Crear un nuevo post
  @Post()
  createOne(@Body() dto: CreateUserDto) {
    return this._userService.createOne(dto);
  }

  // Editar un post por id
  @Put(':id')
  editOne(@Param('id', ParseIntPipe) id: number, @Body() dto: EditUserDto) {
    return this._userService.editOne(id, dto);
  }

  // Eliminar un post por id
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._userService.deleteOne(id);
  }
}
