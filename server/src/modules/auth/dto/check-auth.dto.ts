import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CheckAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
