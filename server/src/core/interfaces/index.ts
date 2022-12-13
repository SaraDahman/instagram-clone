import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface IUser
  extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: CreationOptional<number>;
  username: string;
  name: string;
  email: string;
  password: string;
  private?: boolean; // It will be added automatically
  image?: string;
  bio?: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IPost
  extends Model<InferAttributes<IPost>, InferCreationAttributes<IPost>> {
  id: CreationOptional<number>;
  caption: string;
  media: string[];
  archived: boolean;
  userId: ForeignKey<IUser['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IComment
  extends Model<InferAttributes<IComment>, InferCreationAttributes<IComment>> {
  id: CreationOptional<number>;
  comment: string;
  userId: ForeignKey<IUser['id']>;
  postId: ForeignKey<IPost['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface ILike
  extends Model<InferAttributes<ILike>, InferCreationAttributes<ILike>> {
  userId: ForeignKey<IUser['id']>;
  postId: ForeignKey<IPost['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IBookmarks
  extends Model<
    InferAttributes<IBookmarks>,
    InferCreationAttributes<IBookmarks>
  > {
  userId: ForeignKey<IUser['id']>;
  postId: ForeignKey<IPost['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IStory
  extends Model<InferAttributes<IStory>, InferCreationAttributes<IStory>> {
  id: CreationOptional<number>;
  media: string;
  archived: boolean;
  userId: ForeignKey<IUser['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IViewer
  extends Model<InferAttributes<IViewer>, InferCreationAttributes<IViewer>> {
  stroyId: ForeignKey<IStory['id']>;
  userId: ForeignKey<IUser['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}

export interface IFollowing
  extends Model<
    InferAttributes<IFollowing>,
    InferCreationAttributes<IFollowing>
  > {
  followerId: ForeignKey<IUser['id']>;
  followedId: ForeignKey<IUser['id']>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
}
