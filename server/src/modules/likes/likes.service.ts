import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from '../../core/messages';
import { PostsService } from '../posts/posts.service';
import { LikeDto } from './dto/like.dto';
import { Like } from './entities';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like) private likeRepository: typeof Like,
    private readonly postsService: PostsService,
  ) {}

  async create(postId: number, userId: number) {
    await this.postsService.checkPost(postId);

    const [data] = await this.likeRepository.upsert(
      { postId, userId },
      { returning: true },
    );
    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  async remove(postId: number, userId: number) {
    await this.postsService.checkPost(postId);

    const deleted = await this.likeRepository.destroy({
      where: { postId, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);

    return { message: Messages.DELETE_SUCCESS };
  }
}
