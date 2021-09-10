import { IsNotEmpty } from 'class-validator';

export class createPostDTO {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  content: string;
}
