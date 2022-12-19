import { Controller, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { GetUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/strategy';
import { ValidationParamPipe } from '../../core/Pipes';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(
    @GetUser() userId: number,
    @Param('postId', ValidationParamPipe) postId: number,
  ) {
    return this.likesService.create(postId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(
    @GetUser() userId: number,
    @Param('postId', ValidationParamPipe) postId: number,
  ) {
    return this.likesService.remove(postId, userId);
  }
}
