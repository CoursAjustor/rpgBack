import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Trim()
  @MinLength(5, { message: 'Username should be minimum of 5 characters' })
  public username!: string;

  @IsEmail({}, { message: 'Provided Email is not valid' })
  @Trim()
  public email!: string;

  @IsString()
  @MinLength(8, { message: 'Password should be minimum of 8 characters' })
  public password!: string;
}
