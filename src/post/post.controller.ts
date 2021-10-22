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

import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  // Retorno de todos los post
  @Get()
  async getMany() {
    return await this._postService.getMany();
  }

  // Retornar un post
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.getOne(id);
  }

  // Crear un nuevo post
  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return this._postService.createOne(dto);
  }

  // Editar un post
  @Put(':id')
  editOne(@Param('id', ParseIntPipe) id: number, @Body() dto: EditPostDto) {
    return this._postService.editOne(id, dto);
  }

  // Eliminar un post
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.deleteOne(id);
  }
}
