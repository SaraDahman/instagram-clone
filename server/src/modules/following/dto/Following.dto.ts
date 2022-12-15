import { IsNumber, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FollowingDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  followedId: number;
}
