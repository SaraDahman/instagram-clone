import { IsString, IsArray, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MaxLength(2200)
  caption: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  media: string[];
}
