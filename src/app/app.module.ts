import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PostModule } from 'src/post/post.module';

import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PostModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '4510',
      database: 'blog',
      entities: [Post, User],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
