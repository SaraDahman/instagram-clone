import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './entities';
import { User } from '../index.models';
import { PostsModule } from '../posts/posts.module';
@Module({
  imports: [SequelizeModule.forFeature([Comment, User]), PostsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
