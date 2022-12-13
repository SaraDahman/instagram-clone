import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { User } from 'src/modules/index.models';
import { Viewer } from '../../index.models';
import { IStory } from 'src/core/interfaces';

@Table
export class Story extends Model<IStory> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  media: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  archived: boolean;

  @HasMany(() => Viewer)
  viewers: Viewer[];

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
