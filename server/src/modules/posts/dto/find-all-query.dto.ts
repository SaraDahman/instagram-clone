import { IsNumber, IsInt, IsPositive, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class findAllQueryDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsInt()
  @IsPositive()
  profileUserId?: number;
}
