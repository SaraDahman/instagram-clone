import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Following, Like, User } from '../index.models';
import { Messages } from 'src/core/messages';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities';
import { findAllQueryDTO } from './dto/find-all-query.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
  ) {}

  async create(userId: number, dto: CreatePostDto) {
    const data = await this.postRepository.create({ ...dto, userId });

    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number, dto: findAllQueryDTO) {
    const whereObj = {};
    if (dto.profileUserId) {
      whereObj['userId'] = dto.profileUserId;
    }

    const includeFollowing = [];
    if (userId) {
      includeFollowing[0] = {
        model: Following,
        required: true,
        as: 'followed',
        where: { followerId: userId },
      };
    }
    const data = await this.postRepository.findAll({
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
      where: whereObj,
      order: [['createdAt', 'DESC']],
    });

    return { data };
  }

  async findOne(id: number) {
    const data = await this.postRepository.findOne({
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
    return { data };
  }

  async checkPost(postId: number) {
    const post = await this.postRepository.findByPk(postId);
    if (!post) throw new NotFoundException("This post doesn't exist any more");
  }

  async update(userId: number, id: number, dto: UpdatePostDto) {
    const [updated, data] = await this.postRepository.update(dto, {
      where: { id, userId },
      returning: true,
    });

    if (!updated) throw new BadRequestException(Messages.UPDATE_FAILED);
    return { data, message: Messages.UPDATE_SUCCESS };
  }

  async remove(userId: number, id: number) {
    const deleted = await this.postRepository.destroy({
      where: { id, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);
    return { message: Messages.DELETE_SUCCESS };
  }
}
