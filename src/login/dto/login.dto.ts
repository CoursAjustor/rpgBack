import { Trim } from 'class-sanitizer';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @Trim()
  public username!: string;

  @IsString()
  public password!: string;
}
