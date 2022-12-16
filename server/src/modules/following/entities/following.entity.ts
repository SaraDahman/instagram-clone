import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from 'src/modules/index.models';
import { IFollowing } from 'src/core/interfaces';

@Table
export class Following extends Model<IFollowing> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  followerId: number;

  @BelongsTo(() => User, 'followerId')
  follower: User;

  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  @Column
  followedId: number;

  @BelongsTo(() => User, 'followedId')
  followed: User;
}
