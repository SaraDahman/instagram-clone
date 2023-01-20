import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsEmail,
  IsBoolean,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsBoolean()
  private: boolean;
}
