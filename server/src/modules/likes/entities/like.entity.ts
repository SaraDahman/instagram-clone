import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User, Post } from 'src/modules/index.models';
import { ILike } from 'src/core/interfaces';

@Table
export class Like extends Model<ILike> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({
    primaryKey: true,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
