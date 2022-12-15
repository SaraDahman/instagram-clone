import { Controller, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/like.dto';
import { GetUser } from '../auth/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/strategy';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  create(@GetUser() userId: number, @Param() dto: LikeDto) {
    return this.likesService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(@GetUser() userId: number, @Param() dto: LikeDto) {
    return this.likesService.remove(dto, userId);
  }
}
