import { IsArray, IsBoolean, IsEnum, IsString } from 'class-validator';
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
  @IsEnum(PostCategory, {
    message: `Opción invalida, Las opciones correctas son ${EnumToString(
      PostCategory,
    )}`,
  })
  category: PostCategory;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsBoolean()
  status: boolean;
}