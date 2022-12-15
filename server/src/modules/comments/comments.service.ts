import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}
  async create(CommentDto: CommentDto, postId: number) {
    return await this.commentModel.create({ postId, userId: 1 });
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, CommentDto: CommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
