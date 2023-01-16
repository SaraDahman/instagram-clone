import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from '../../core/messages';
import { PostsService } from '../posts/posts.service';
import { Post, Bookmark, Comment, Like } from '../index.models';
import { fn, col } from 'sequelize';
import { comments } from '../../core/database/seeder-data';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark) private BookmarkRepository: typeof Bookmark,
    private readonly postsService: PostsService,
  ) {}
  async create(userId: number, postId: number) {
    await this.postsService.checkPost(postId);

    const [data] = await this.BookmarkRepository.upsert(
      { postId, userId },
      { returning: true },
    );
    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number) {
    const data = await this.BookmarkRepository.findAll({
      attributes: [],
      raw: true,
      include: [
        {
          model: Post,
          attributes: ['media'],
          include: [
            {
              model: Like,
              attributes: [[fn('COUNT', col('post.likes.userId')), 'likes']],
            },
          ],
        },
      ],
      where: { userId },
      group: ['post.id', 'post->likes.userId', 'post->likes.postId'],
    });
    const modifiedData = data.map((item) => {
      return {
        media: item['post.media'],
        postId: item['post.likes.postId'],
        userId: item['post.likes.userId'],
        likes: item['post.likes.likes'],
      };
    });
    console.log(modifiedData);
    console.log('No error');
    const data1 = await Post.findAll({
      attributes: [
        'id',
        'caption',
        [fn('COUNT', col('comments.postId')), 'Comments'],
      ],
      include: [
        {
          model: this.BookmarkRepository,
          attributes: [],
        },
        {
          model: Comment,
          attributes: [],
        },
      ],
      where: { userId },
      group: ['Post.id'],
    });

    console.log(data1[0].dataValues);
    return modifiedData;
  }

  async remove(userId: number, postId: number) {
    await this.postsService.checkPost(postId);

    const deleted = await this.BookmarkRepository.destroy({
      where: { postId, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);

    return { message: Messages.DELETE_SUCCESS };
  }
}
