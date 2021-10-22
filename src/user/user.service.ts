import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import { User } from './entities';
import { EditUserDto } from './dtos/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly _userRepository: Repository<User>,
  ) {}

  // Retornar los usuarios
  async getMany() {
    const data: User[] = await this._userRepository.find();

    return {
      message: 'Consulta exitosa',
      data,
    };
  }

  // Retornar un usuario por id
  async getOne(id: number) {
    const data: User = await this._userRepository.findOne(id);

    if (!data) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      message: 'Consulta exitosa',
      data,
    };
  }

  // Retornar un usuario por email
  async getOneForEmail(email: string) {
    return await this._userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }

  // Crear un nuevo usuario
  async createOne(dto: CreateUserDto) {
    const userExist = await this._userRepository.findOne({ email: dto.email });

    if (userExist) {
      throw new BadRequestException(
        'Ya existe un usuario registrado con este email',
      );
    }

    const data = this._userRepository.create(dto);
    const saveData = await this._userRepository.save(data);
    delete saveData.password; // Se borra el campo para no retornarlo en respuesta

    if (!saveData) {
      throw new NotFoundException('Usuario no almacenado');
    }

    return {
      message: 'Usuario creado',
      saveData,
    };
  }

  // Editar un usuario por su id
  async editOne(id: number, dto: EditUserDto) {
    const data: User = await this._userRepository.findOne(id);

    if (!data) {
      throw new NotFoundException('Usuario no existe');
    }

    const editedData: User = Object.assign(data, dto);
    const saveData: User = await this._userRepository.save(editedData);
    delete saveData.password; // Se borra el campo para no retornarlo en respuesta

    return {
      message: 'Usuario editado',
      saveData,
    };
  }

  // Eliminar un usuario por id
  async deleteOne(id: number) {
    const data = await this._userRepository.delete(id);

    return {
      message: 'Usuario eliminado',
      data,
    };
  }
}
