import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from '../../core/messages';
import { PostsService } from '../posts/posts.service';
import { Post, Bookmark, Comment, Like } from '../index.models';
import { fn, col } from 'sequelize';

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
    const bookmarks = await Post.findAll({
      attributes: ['id', 'media', [fn('COUNT', col('likes.postId')), 'likes']],
      raw: true,
      include: [
        {
          model: this.BookmarkRepository,
          attributes: [],
          required: true,
          where: { userId },
        },
        {
          model: Like,
          attributes: [],
        },
      ],
      group: 'Post.id',
      order: [['id', 'DESC']],
    });

    const postComments = await Post.findAll({
      attributes: ['id', [fn('COUNT', col('comments.postId')), 'comments']],
      raw: true,
      include: [
        {
          model: this.BookmarkRepository,
          attributes: [],
          required: true,
          where: { userId },
        },
        {
          model: Comment,
          attributes: [],
        },
      ],
      group: ['Post.id'],
      order: [['id', 'DESC']],
    });

    const modifiedData = bookmarks.map((bookmark, i) => {
      return { ...bookmark, ...postComments[i] };
    });
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
