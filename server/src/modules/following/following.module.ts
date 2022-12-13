import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';

@Module({
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
