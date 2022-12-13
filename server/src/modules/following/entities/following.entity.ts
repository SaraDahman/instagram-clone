import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from 'src/modules/index.models';

@Table
export class Following extends Model {
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
