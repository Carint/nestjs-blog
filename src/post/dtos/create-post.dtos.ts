import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { PostCategory } from '../enums';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  excerpt: string;

  @IsString()
  content: string;

  // Se personalizo el mensaje de error en la validación
  @IsNotEmpty()
  @IsEnum(PostCategory, {
    message: `Opción invalida, Las opciones correctas son ${EnumToString(
      PostCategory,
    )}`,
  })
  category: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  status: boolean;
}
