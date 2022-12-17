import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import {
  Post,
  Comment,
  Story,
  Like,
  Bookmark,
  Following,
} from '../../index.models';

import { IUser } from 'src/core/interfaces';

@Table
export class User extends Model<IUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue:
      'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
  })
  image: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  bio: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  private: boolean;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Story)
  stories: Story[];

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Bookmark)
  bookmarks: Bookmark[];

  @HasMany(() => Following, 'followerId')
  follower: Following[];

  @HasMany(() => Following, 'followedId')
  followed: Following[];
}
