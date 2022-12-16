import { IsNumber, IsInt, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FollowingDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  followedId: number;

  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @IsOptional()
  followerId: number;
}
