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
import { FollowingDto } from './dto';
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
    const data = await Following.upsert({ followedId, followerId });
    return data;
  }

  async findAll(followingDto: FollowingDto) {
    const whereObj = {};
    let as = 'follower';
    if (followingDto.followedId) {
      // To get all users who are following you
      whereObj['followedId'] = followingDto.followedId;
    } else {
      // To get all users who you are following
      whereObj['followerId'] = followingDto.followerId;
      as = 'followed';
    }

    const data = await this.followingRepository.findAll({
      nest: false,
      raw: true,
      attributes: ['followerId'],
      where: whereObj,
      include: {
        model: this.userRepository,
        attributes: ['name', 'image', 'username'],
        required: true,
        as,
      },
    });
    return data;
  }

  async remove(followedId: number, followerId: number) {
    const affectedRows = await this.followingRepository.destroy({
      where: { followedId, followerId },
    });
    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.DELETE_SUCCESS };
  }
}
