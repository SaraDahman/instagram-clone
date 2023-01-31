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
import { literal } from 'sequelize';
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

  async findAll(followingDto: FollowingDto, followerId: number) {
    const whereObj = {};
    let as = 'follower';
    let attributes = [];
    // Here we suppose that the current user is 1
    if (followingDto.followedId) {
      // To get all users who are following you
      whereObj['followedId'] = followingDto.followedId;
      attributes = [
        'follower.name' as 'name',
        'follower.id' as 'id',
        'follower.username' as 'username',
        'follower.image' as 'image',
        [
          literal(
            `case when 0 < 
            (
              select  "Followings"."followedId" 
              from "Followings" 
              where "Followings"."followerId"=${followerId} 
              and "Followings"."followedId"="follower"."id"
            )  
              then true else false end`,
          ),
          'following',
        ],
      ];
    } else {
      // To get all users who you are following
      whereObj['followerId'] = followingDto.followerId;
      attributes = [
        'followed.name' as 'name',
        'followed.id' as 'id',
        'followed.username' as 'username',
        'followed.image' as 'image',
        [
          literal(
            `case when 0 < 
            (
              select  "Followings"."followerId" 
              from "Followings" 
              where "Followings"."followerId"=${followerId}
              and "Followings"."followedId"="followed"."id"
            )  
            then true else false end`,
          ),
          'following',
        ],
      ];
      as = 'followed';
    }

    const data = await this.followingRepository.findAll({
      nest: false,
      raw: true,
      attributes,
      where: whereObj,
      include: {
        model: this.userRepository,
        attributes: [],
        required: true,
        as,
      },
    });
    return data;
  }

  async remove(followedId: number, followerId: number, remove: boolean) {
    const where = { followedId, followerId };

    if (remove) {
      where['followedId'] = followerId;
      where['followerId'] = followedId;
    }
    const affectedRows = await this.followingRepository.destroy({
      where,
    });

    if (!affectedRows) throw new NotFoundException();
    return { message: Messages.DELETE_SUCCESS };
  }
}
