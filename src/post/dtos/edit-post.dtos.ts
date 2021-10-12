import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from '.';

// Se realiza un extends de CreatePostDto, y define todos los campos opcionales
// export class EditPostDto extends PartialType(CreatePostDto) {}

// Se confungura la funcion PartialType para omitir el campo 'slug'
export class EditPostDto extends PartialType(
  OmitType(CreatePostDto, ['slug'] as const),
) {}
