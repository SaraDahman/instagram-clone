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

  async create(dto: LikeDto, userId: number) {
    const post = await this.postsService.findOne(dto.postId);
    if (!post) throw new NotFoundException();

    const [data] = await this.likeRepository.upsert(
      { ...dto, userId },
      { returning: true },
    );
    if (!data) throw new BadRequestException(Messages.CREATE_FAILED);

    return { data, message: Messages.CREATE_SUCCESS };
  }

  async remove(dto: LikeDto, userId: number) {
    const post = this.postsService.findOne(dto.postId);
    if (!post) throw new NotFoundException();

    const deleted = await this.likeRepository.destroy({
      where: { ...dto, userId },
    });
    if (!deleted) throw new BadRequestException(Messages.DELETE_FAILED);

    return { message: Messages.DELETE_SUCCESS };
  }
}
