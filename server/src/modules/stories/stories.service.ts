import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Story, User, Following } from '../index.models';
import { CreateStoryDto } from './dto/create-story.dto';
import { Messages } from 'src/core/messages';
import { Op } from 'sequelize';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Story) private storyRepository: typeof Story,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Following) private followingRepository: typeof Following,
  ) { }
  async create(userId, createStoryDto: CreateStoryDto) {
    const newStory = await this.storyRepository.create({
      ...createStoryDto,
      userId,
    });

    return { newStory, message: Messages.CREATE_SUCCESS };
  }

  async findAll(userId: number) {
    const followingStories = await this.userRepository.findAll({
      raw: true,
      attributes: ['name', 'username', 'image', 'id'],
      include: [
        {
          model: this.followingRepository,
          attributes: [],
          where: {
            followerId: userId,
          },
          as: 'followed',
          required: true,
        },
        {
          model: this.storyRepository,
          attributes: [],
          required: true,
        },
      ],
      group: ['User.id'],
    });

    return followingStories;
  }

  async findArchived(userId: number) {
    const archivedStory = await this.storyRepository.findAll({
      where: {
        userId,
        deletedAt: {
          [Op.not]: null,
        },
      },
      paranoid: false,
      order: [['createdAt', 'DESC']],
    });
    return archivedStory;
  }

  async findOne(userId: number) {
    const userStory = await this.storyRepository.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
    return userStory;
  }

  async remove(userId: number, id: number, force: boolean) {
    const deleted = await this.storyRepository.destroy({
      where: { userId, id },
      force,
    });

    if (!deleted) throw new BadRequestException('Story not found');

    return { message: Messages.DELETE_SUCCESS };
  }
}
