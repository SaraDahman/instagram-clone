import { IsString, IsArray, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  caption: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  media: string[];

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
