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
import { CreatePostDto } from './dtos';
import { EditPostDto } from './dtos/edit-post.dtos';

@Controller('post')
export class PostController {
  // Retorno de todos los post
  @Get()
  getMany() {
    return {
      message: 'Retorno de post existentes',
    };
  }

  // Retornar un post
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return {
      message: 'Obtener un post',
    };
  }

  // Crear un nuevo post
  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return dto;
  }

  // Editar un post
  @Put(':id')
  editOne(@Param('id') id: string, @Body() dto: EditPostDto) {
    return dto;
  }

  // Eliminar un post
  @Delete()
  deleteOne() {
    return {
      message: 'Eliminar un post',
    };
  }
}
