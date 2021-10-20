import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePostDto, EditPostDto } from '../dtos';

import { Post } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly _postRepository: Repository<Post>,
  ) {}

  // Retornar los post
  async getMany() {
    const data: Post[] = await this._postRepository.find();

    return {
      message: 'Consulta exitosa',
      data,
    };
  }

  // Retornar un post por id
  async getOne(id: number) {
    const data: Post = await this._postRepository.findOne(id);

    if (!data) {
      throw new NotFoundException('Post no encontrado');
    }

    return {
      message: 'Consulta exitosa',
      data,
    };
  }

  // Crear un nuevo post
  async createOne(dto: CreatePostDto) {
    // TODO: corregir el error del parametro dto y tipado de las const
    // const data: Post = this._postRepository.create(dto);
    const data = this._postRepository.create(dto);

    if (!data) {
      throw new NotFoundException('Post no almacenado');
    }

    const saveData = await this._postRepository.save(data);

    return {
      message: 'Post creado',
      saveData,
    };
  }

  // Editar un post por su id
  async editOne(id: number, dto: EditPostDto) {
    const data: Post = await this._postRepository.findOne(id);

    if (!data) {
      throw new NotFoundException('Post no existe');
    }

    const editedData: Post = Object.assign(data, dto);
    const saveData: Post = await this._postRepository.save(editedData);

    return {
      message: 'Post editado',
      saveData,
    };
  }

  // Eliminar un post por id
  async deleteOne(id: number) {
    const data = await this._postRepository.delete(id);

    return {
      message: 'Post eliminado',
      data,
    };
  }
}
