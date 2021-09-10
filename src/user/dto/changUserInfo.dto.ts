import { IsNotEmpty } from 'class-validator';

export class changUserInfo {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
