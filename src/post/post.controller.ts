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
import { Auth } from 'src/common/decorators';

import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  // Retorno de todos los post
  @Get()
  @ApiOperation({ summary: 'Obtener todos los post' })
  async getMany() {
    return await this._postService.getMany();
  }

  // Retornar un post
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un post por id' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.getOne(id);
  }

  // Crear un nuevo post
  @Auth()
  @Post()
  @ApiOperation({ summary: 'Creación de un nuevo post' })
  createOne(@Body() dto: CreatePostDto) {
    return this._postService.createOne(dto);
  }

  // Editar un post
  @Auth()
  @Put(':id')
  @ApiOperation({ summary: 'Editar un post' })
  editOne(@Param('id', ParseIntPipe) id: number, @Body() dto: EditPostDto) {
    return this._postService.editOne(id, dto);
  }

  // Eliminar un post
  @Auth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un post' })
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this._postService.deleteOne(id);
  }
}
