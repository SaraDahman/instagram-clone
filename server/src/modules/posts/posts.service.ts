import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Following, Like, User, Comment } from '../index.models';
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
  async findAll(userId: number, offset: number) {
    const includeFollowing = [];
    if (userId) {
      includeFollowing[0] = {
        model: Following,
        attributes: [],
        required: true,
        as: 'followed',
        where: { followerId: userId },
        duplicating: false,
      };
    }
    const data = await this.postRepository.findAll({
      attributes: [
        '*',
        [fn('COUNT', col('likes.userId')), 'likes'],
        // [fn('COUNT', col('comments.id')), 'comments'],
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
          duplicating: false,
          include: includeFollowing,
        },
        {
          model: Like,
          duplicating: false,
          attributes: [],
        },
      ],
      order: [['createdAt', 'DESC']],
      group: ['Post.id', 'user.id'],
      limit: 3,
      offset,
    });

    const postsFound = await this.postRepository.count({
      include: [
        {
          model: User,
          attributes: [],
          required: true,
          include: includeFollowing,
        },
      ],
    });

    const comments = await this.postRepository.findAll({
      attributes: ['id', [fn('COUNT', col('comments.id')), 'comments']],
      raw: true,
      include: [
        {
          model: User,
          attributes: [],
          required: true,
          include: includeFollowing,
        },
        {
          model: Comment,
          attributes: [],
        },
      ],
      order: [['createdAt', 'DESC']],
      group: ['Post.id'],
    });

    return { data, postsFound, comments };
  }

  // get all the posts for one user (profile page)
  async findUserPosts(username: string) {
    const { id } = await this.userRepository.findOne({
      attributes: ['id'],
      where: { username },
    });

    if (!id) throw new NotFoundException('user not found');

    const posts = await this.postRepository.findAll({
      where: { userId: id },
      attributes: [
        'id',
        'media',
        [fn('COUNT', col('comments.id')), 'comments'],
      ],
      raw: true,
      include: { model: Comment, attributes: [] },
      order: [['createdAt', 'DESC']],
      group: ['Post.id'],
    });
    const likesCount = await this.postRepository.findAll({
      where: { userId: id },
      attributes: [[fn('COUNT', col('likes.userId')), 'likes']],
      raw: true,
      include: { model: Like, attributes: [] },
      order: [['createdAt', 'DESC']],
      group: ['Post.id'],
    });
    posts.map((post, i) => {
      const { likes } = likesCount[i];
      post['likes'] = likes;
      return post;
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

    const comments = await this.postRepository.findOne({
      include: [
        {
          model: User,
          attributes: ['name', 'username', 'image'],
        },
        {
          model: Comment,
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

    return { data, comments: comments.comments };
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
