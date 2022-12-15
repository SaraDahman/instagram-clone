import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
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

  @Get(':followedId')
  findAll(@Param() dto: FollowingDto) {
    return this.followingService.findAll(dto.followedId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':followedId')
  remove(@Param() dto: FollowingDto, @GetUser() followerId: number) {
    return this.followingService.remove(dto.followedId, followerId);
  }
}
