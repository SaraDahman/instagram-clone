import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  media: string;
}
