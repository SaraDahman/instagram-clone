import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { GetUser } from '../auth/decorator/user.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body()
    createCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return this.commentsService.create(createCommentDto, postId, userId);
  }

  @Get(':postId')
  findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findAll(postId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':commentId')
  update(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: CommentDto,
    @GetUser() userId: number,
  ) {
    return this.commentsService.update(updateCommentDto, commentId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId/post/:postId')
  remove(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() userId: number,
  ) {
    return this.commentsService.remove(commentId, postId, userId);
  }
}
