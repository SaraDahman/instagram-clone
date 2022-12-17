import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Story, User, Following } from '../index.models';

@Module({
  imports: [SequelizeModule.forFeature([Story, User, Following])],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule { }
