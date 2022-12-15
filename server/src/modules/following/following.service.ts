import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Following } from './entities';
import { User } from '../index.models';
import { UserService } from '../user/user.service';
import { Messages } from '../../core/messages/index';

@Injectable()
export class FollowingService {
  constructor(
    @InjectModel(Following) private followingRepository: typeof Following,
    @InjectModel(User) private userRepository: typeof User,
    private userService: UserService,
  ) {}
  async create(followedId: number, followerId: number) {
    if (followedId === followerId) throw new BadRequestException();
    await this.userService.checkUser(followedId);
    return await Following.upsert({ followedId, followerId });
  }

  async findAll(followedId: number) {
    return await this.followingRepository.findAll({
      nest: false,
      raw: true,
      attributes: ['followerId'],
      where: { followedId },
      include: {
        model: this.userRepository,
        attributes: ['name', 'image', 'username'],
        required: true,
        as: 'follower',
      },
    });
  }

  async remove(followedId: number, followerId: number) {
    const affectedRows = await this.followingRepository.destroy({
      where: { followedId, followerId },
    });

    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.DELETE_SUCCESS };
  }
}
