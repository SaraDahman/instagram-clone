import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import {
  AuthModule,
  UserModule,
  PostsModule,
  BookmarksModule,
  CommentsModule,
  LikesModule,
  StoriesModule,
  ViewersModule,
  FollowingModule,
} from './modules';

import config from './core/database/connection';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    SequelizeModule.forRoot({
      ...config,
      sync: { force: false },
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostsModule,
    BookmarksModule,
    CommentsModule,
    LikesModule,
    StoriesModule,
    ViewersModule,
    FollowingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
