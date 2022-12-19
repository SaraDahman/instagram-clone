import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { BookmarksService } from './bookmarks.service';
import { GetUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/strategy';
import { ValidationParamPipe } from '../../core/Pipes';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(
    @GetUser() userId: number,
    @Param('postId', ValidationParamPipe) postId: number,
  ) {
    return this.bookmarksService.create(userId, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@GetUser() userId: number) {
    return this.bookmarksService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(
    @GetUser() userId: number,
    @Param('postId', ValidationParamPipe) postId: number,
  ) {
    return this.bookmarksService.remove(userId, postId);
  }
}
