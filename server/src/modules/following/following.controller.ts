import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingDto } from './dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth-guard';
import { GetUser } from '../auth/decorator/user.decorator';

@Controller('followings')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':followedId')
  create(@Param() dto: FollowingDto, @GetUser() followerId: number) {
    return this.followingService.create(dto.followedId, followerId);
  }

  @Get()
  findAllFollowers(@Query() dto: FollowingDto) {
    // Get all followers for specific user
    return this.followingService.findAll(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':followedId')
  remove(@Param() dto: FollowingDto, @GetUser() followerId: number) {
    return this.followingService.remove(dto.followedId, followerId);
  }
}
