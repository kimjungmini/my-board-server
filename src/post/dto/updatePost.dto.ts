import { IsNotEmpty } from 'class-validator';

export class updatePostDTO {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  content: string;
}
