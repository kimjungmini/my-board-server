import { IsNotEmpty } from 'class-validator';

export class signupDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
