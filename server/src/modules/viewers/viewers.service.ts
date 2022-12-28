import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { User, Story, Viewer } from '../index.models';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from 'src/core/messages';
@Injectable()
export class ViewersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Story) private storyRepository: typeof Story,
    @InjectModel(Viewer) private viewerRepository: typeof Viewer,
  ) { }
  async create(userId: number, storyId: number) {
    const story = await this.storyRepository.findOne({
      where: { id: storyId },
    });

    if (!story) throw new BadRequestException('Expected a valid story id');

    const [viewer, created] = await this.viewerRepository.findOrCreate({
      where: {
        userId,
        storyId,
      },
      defaults: {
        userId,
        storyId,
      },
    });

    if (!created)
      throw new ForbiddenException('The user already viewed the story');

    return { viewer, message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number, storyId: number) {

    const story = await this.storyRepository.findOne({
      where: { id: storyId, userId },
    });

    if (!story) throw new BadRequestException('Expected a valid story/user id');

    const allViewers = await this.userRepository.findAll({
      raw: true,
      attributes: ['id', 'name', 'username', 'image'],
      include: [
        {
          model: this.viewerRepository,
          where: { storyId },
          required: true,
          attributes: [],
        },
      ],
    });
    return allViewers;
  }
}
