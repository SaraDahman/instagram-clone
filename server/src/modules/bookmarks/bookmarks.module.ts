import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmark } from './entities';
import { Like, Post } from '../index.models';
import { PostsService } from '../posts/posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Bookmark, Post, Like])],
  controllers: [BookmarksController],
  providers: [BookmarksService, PostsService],
})
export class BookmarksModule {}
