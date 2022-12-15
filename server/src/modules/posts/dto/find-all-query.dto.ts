import { IsNumber, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class findAllQueryDTO {
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  profileUserId?: number;
}
