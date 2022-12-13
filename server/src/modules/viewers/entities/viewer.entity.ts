import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Story, User } from 'src/modules/index.models';

@Table
export class Viewer extends Model {
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
