import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { User, Comment, Like, Bookmark } from '../../index.models';
import { IPost } from 'src/core/interfaces';

@Table
export class Post extends Model<IPost> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  caption: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: false,
  })
  media: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  archived: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Bookmark)
  bookMarks: Bookmark[];
}
