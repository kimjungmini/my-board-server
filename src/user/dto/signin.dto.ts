import { IsNotEmpty } from 'class-validator';

export class signinDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
