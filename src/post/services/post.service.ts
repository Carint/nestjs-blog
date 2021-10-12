import { Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from '../dtos';

@Injectable()
export class PostService {
  // Retornar los post
  getMany() {
    return { message: 'Ok' };
  }

  // Retornar un post
  getOne(id: number) {
    return { message: 'Ok' };
  }

  // Crear un nuevo post
  createOne(dto: CreatePostDto) {
    return { message: 'Ok' };
  }

  // Editar un post
  editOne(id: number, dto: EditPostDto) {
    return { message: 'Ok' };
  }

  // Eliminar un post
  deleteOne(id: number) {
    return { message: 'Ok' };
  }
}
