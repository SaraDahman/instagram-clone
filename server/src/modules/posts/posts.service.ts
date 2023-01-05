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
import { fn, col } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async create(userId: number, dto: CreatePostDto) {
    const data = await this.postRepository.create({ ...dto, userId });

    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  // get all home page posts
  async findAll(userId: number) {
    const includeFollowing = [];
    if (userId) {
      includeFollowing[0] = {
        model: Following,
        attributes: [],
        required: true,
        as: 'followed',
        where: { followerId: userId },
      };
    }
    const data = await this.postRepository.findAll({
      attributes: [
        '*',
        [fn('COUNT', col('likes.user.id')), 'likes'],
        'user.name' as 'name',
        'user.username' as 'username',
        'user.image' as 'image',
      ],
      raw: true,
      include: [
        {
          model: User,
          attributes: [],
          required: true,
          include: includeFollowing,
        },
        {
          model: Like,
          attributes: [],
          include: [
            {
              model: User,
              attributes: [],
              required: true,
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      group: ['Post.id', 'user.id'],
    });

    return data;
  }

  // get all the posts for one user (profile page)
  async findUserPosts(username) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) throw new NotFoundException('user not found');

    const posts = this.postRepository.findAll({
      attributes: [
        '*',
        'user.name' as 'name',
        'user.username' as 'username',
        'user.image' as 'image',
      ],
      raw: true,
      include: [
        {
          model: this.userRepository,
          attributes: [],
          required: true,
          where: { username },
        },
      ],
    });

    return posts;
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

    return data;
  }

  async checkPost(postId: number) {
    const post = await this.postRepository.findByPk(postId);
    if (!post) throw new NotFoundException(Messages.POST_NOT_FOUND);
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
