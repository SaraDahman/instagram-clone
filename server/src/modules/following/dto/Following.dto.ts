import {
  IsNumber,
  IsInt,
  IsPositive,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FollowingDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  followedId: number;

  @ValidateIf((following: FollowingDto) => !Boolean(following.followedId))
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  followerId: number;
}
