import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { Following } from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../index.models';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Following, User]), UserModule],
  controllers: [FollowingController],
  providers: [FollowingService],
})
export class FollowingModule {}
