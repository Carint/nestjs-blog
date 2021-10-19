import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  excerpt: string;

  @ApiProperty()
  @IsString()
  content: string;

  // Se personalizo el mensaje de error en la validación
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PostCategory, {
    message: `Opción invalida, Las opciones correctas son ${EnumToString(
      PostCategory,
    )}`,
  })
  category: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
