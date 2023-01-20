import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { col, fn } from 'sequelize';
import { Following, Post } from '../index.models';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUserFollowingNumber(
    username: string,
    attributes: string[],
    columnName: string,
    alisa: string,
    as: string,
  ) {
    const user = await this.userRepository.findOne({
      attributes: [...attributes, [fn('count', col(columnName)), alisa]],
      raw: true,
      include: [
        {
          model: Following,
          as,
          attributes: [],
        },
      ],
      group: ['User.id'],
      where: { username },
    });

    if (!user) throw new NotFoundException();
    return user;
  }

  findUserProfileInfo = async (username: string) => {
    const user = await this.getUserFollowingNumber(
      username,
      ['id', 'name', 'bio', 'username', 'image'],
      'followed.followedId',
      'followers',
      'followed',
    );
    const followings = await this.getUserFollowingNumber(
      username,
      [],
      'followerId',
      'followings',
      'follower',
    );

    const posts = await this.getUserPostsNumber(user.id);
    return {
      ...user,
      ...followings,
      ...posts,
    };
  };

  async getUserPostsNumber(userId: number) {
    const posts = await Post.findOne({
      attributes: [[fn('count', col('id')), 'posts']],
      raw: true,
      where: { userId },
    });
    return posts || 0;
  }

  async checkUser(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException();
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      attributes: ['id', 'name', 'username', 'email', 'image', 'bio'],
      where: { id },
    });
    if (!user) throw new NotFoundException();

    return user;
  }
}
