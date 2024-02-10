import { IsEmail, IsNotIn, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotIn(['admin'])
  role: string;

  @IsString()
  @MinLength(8)
  password: string;
}
