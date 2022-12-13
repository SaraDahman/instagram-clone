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

  @ForeignKey(() => User)
  @Column
  followedId: number;

  @BelongsTo(() => User)
  user: User;
}
