import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from 'src/core/messages';
import { Following, Like, User } from '../index.models';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async create(dto: CreatePostDto) {
    const data = await this.postModel.create(dto);

    if (!data) throw new BadRequestException(Messages.CREATE_POST_FAILED);

    return { data, message: Messages.CREATE_POST };
  }

  async findAll() {
    const authUser = 0;
    const includeFollowing = [];
    if (authUser) {
      includeFollowing[0] = {
        model: Following,
        required: true,
        as: 'followed',
        where: { followerId: authUser },
      };
    }
    return await this.postModel.findAll({
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
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    return await this.postModel.findOne({
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

  async update(id: number, dto: UpdatePostDto) {
    const [updated, data] = await this.postModel.update(dto, {
      where: { id },
      returning: true,
    });

    if (!updated) throw new BadRequestException(Messages.UPDATE_POST_FAILED);
    return { data: data[0], message: Messages.UPDATE_POST };
  }

  async remove(id: number) {
    const deleted = await this.postModel.destroy({ where: { id } });

    if (!deleted) throw new BadRequestException(Messages.DELETE_POST_FAILED);
    return { message: Messages.DELETE_POST };
  }
}
