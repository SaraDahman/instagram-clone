import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Following, Like, User } from '../index.models';
import { Messages } from 'src/core/messages';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
  ) {}

  async create(userId: number, dto: CreatePostDto) {
    const data = await this.postRepository.create({ ...dto, userId });

    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number) {
    const includeFollowing = [];
    if (userId) {
      includeFollowing[0] = {
        model: Following,
        required: true,
        as: 'followed',
        where: { followerId: userId },
      };
    }
    return await this.postRepository.findAll({
      attributes: { exclude: ['updatedAt'] },
      include: [
        {
          model: User,
          attributes: ['name', 'username', 'image'],
          required: true,
          include: includeFollowing,
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ['name', 'username', 'image'],
              required: true,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'username', 'image'],
        },
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ['name', 'username', 'image'],
            },
          ],
        },
      ],
      where: { id },
    });
  }

  async update(userId: number, id: number, dto: UpdatePostDto) {
    const [updated] = await this.postRepository.update(dto, {
      where: { id, userId },
      returning: true,
    });

    if (!updated) throw new BadRequestException(Messages.UPDATE_FAILED);
    return { message: Messages.UPDATE_SUCCESS };
  }

  async remove(userId: number, id: number) {
    const deleted = await this.postRepository.destroy({
      where: { id, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);
    return { message: Messages.DELETE_POST };
  }
}
