import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostModule } from 'src/post/post.module';

import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: '4510',
    //   database: 'blog',
    //   entities: [Post, User],
    //   // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: parseInt(config.get<string>('DATABASE_PORT'), 10),
        username: config.get<string>('DATABASE_USERNAME'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        entities: [Post, User],
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'file',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.dev.env',
    }), // TODO: Ver documentación para mayor configuración docs.nestjs.com/techniques/configuration
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
