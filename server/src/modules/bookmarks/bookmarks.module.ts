import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmark } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Bookmark])],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
