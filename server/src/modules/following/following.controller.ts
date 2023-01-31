import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingDto } from './dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { GetUser } from '../auth/decorator/user.decorator';
import { ValidationParamPipe } from '../../core/Pipes';

@Controller('followings')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':followedId')
  create(
    @Param('followedId', ValidationParamPipe) followedId: number,
    @GetUser() followerId: number,
  ) {
    return this.followingService.create(followedId, followerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllFollowers(@Query() dto: FollowingDto, @GetUser() followerId: number) {
    // Get all followers for specific user
    return this.followingService.findAll(dto, followerId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':followedId')
  remove(
    @Param('followedId', ValidationParamPipe) followedId: number,
    @GetUser() followerId: number,
    @Query('remove') remove: boolean,
  ) {
    return this.followingService.remove(followedId, followerId, remove);
  }
}
