import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Story, User } from 'src/modules/index.models';
import { IViewer } from 'src/core/interfaces';

@Table
export class Viewer extends Model<IViewer> {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Story)
  @Column({
    primaryKey: true,
  })
  storyId: number;

  @BelongsTo(() => Story)
  story: Story;
}
