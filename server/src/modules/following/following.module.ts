import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { Following } from './entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Following])],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
