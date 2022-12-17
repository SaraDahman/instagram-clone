import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from '../../core/messages';
import { PostsService } from '../posts/posts.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { Post, Bookmark, User, Like } from '../index.models';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectModel(Bookmark) private BookmarkRepository: typeof Bookmark,
    @InjectModel(Post) private PostRepository: typeof Post,
    private readonly postsService: PostsService,
  ) {}
  async create(userId: number, dto: BookmarkDto) {
    await this.postsService.checkPost(dto.postId);

    const [data] = await this.BookmarkRepository.upsert(
      { ...dto, userId },
      { returning: true },
    );
    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number) {
    const data = await this.BookmarkRepository.findAll({
      include: [
        {
          model: Post,
          required: true,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'username', 'image'],
            },
            {
              model: Like,
              include: [
                {
                  model: User,
                  attributes: ['id', 'name', 'username', 'image'],
                },
              ],
            },
          ],
        },
      ],
      where: { userId },
    });
    return { data };
  }

  async remove(userId: number, dto: BookmarkDto) {
    await this.postsService.checkPost(dto.postId);

    const deleted = await this.BookmarkRepository.destroy({
      where: { ...dto, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);

    return { message: Messages.DELETE_SUCCESS };
  }
}
