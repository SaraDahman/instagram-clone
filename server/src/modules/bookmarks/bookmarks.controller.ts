import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { GetUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/strategy';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(@GetUser() userId: number, @Param() dto: BookmarkDto) {
    return this.bookmarksService.create(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@GetUser() userId: number) {
    return this.bookmarksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(@GetUser() userId: number, @Param() dto: BookmarkDto) {
    return this.bookmarksService.remove(userId, dto);
  }
}
