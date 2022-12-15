import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsAlphanumeric,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  name: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
