import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { CommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/';
import { Messages } from 'src/core/messages';
import { User } from '../user/entities/user.entity';
import { PostsService } from '../posts/posts.service';
@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
    private postsService: PostsService,
  ) {}
  async create(createCommentDto: CommentDto, postId: number, userId: number) {
    // Check if the post sill exist
    await this.postsService.checkPost(postId);
    const data = await this.commentRepository.create({
      ...createCommentDto,
      postId,
      userId,
    });
    return { message: Messages.CREATE_SUCCESS, data };
  }

  async findAll(postId: number) {
    return await this.commentRepository.findAll({
      attributes: { exclude: ['updatedAt', 'postId'] },
      where: { postId },
      include: {
        model: this.userRepository,
        attributes: ['username', 'image', 'name'],
        required: true,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async update(updateCommentDto: CommentDto, id: number, userId: number) {
    const [affectedRows, data] = await this.commentRepository.update(
      {
        comment: updateCommentDto.comment,
      },
      {
        where: { id, userId },
        returning: true,
      },
    );
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.UPDATE_SUCCESS, data };
  }

  async remove(id: number, postId: number, userId: number) {
    const affectedRows = await this.commentRepository.destroy({
      where: {
        id,
        [Op.or]: [
          {
            userId: sequelize.literal(
              `0<(SELECT "userId" FROM "Posts" as posts where "id"=${postId} and 
               "userId" = ${userId})`,
            ),
          },
          {
            userId,
          },
        ],
      },
    });

    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.DELETE_SUCCESS };
  }
}
