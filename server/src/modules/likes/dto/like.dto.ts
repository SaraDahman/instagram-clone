import { IsNumber, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class LikeDto {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  postId: number;
}
