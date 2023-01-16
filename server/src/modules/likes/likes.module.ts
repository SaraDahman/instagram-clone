import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { PostsService } from '../posts/posts.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './entities';
import { Post, User } from '../index.models';

@Module({
  imports: [SequelizeModule.forFeature([Like, Post, User])],
  controllers: [LikesController],
  providers: [LikesService, PostsService],
})
export class LikesModule {}
