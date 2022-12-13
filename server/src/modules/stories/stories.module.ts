import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Story } from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Story])],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
