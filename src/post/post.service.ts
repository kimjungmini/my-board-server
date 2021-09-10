import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { createPostDTO } from './dto/createPost.dto';
import { updatePostDTO } from './dto/updatePost.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(@Inject(PostRepository) private postRepository: PostRepository) {}

  getAllPosts() {
    return this.postRepository.find();
  }
  getPostDetail(id: number) {
    return this.postRepository.findOne({ id });
  }

  async createPost(createPostDTO: createPostDTO, user: User) {
    const post = this.postRepository.create({ ...createPostDTO, user });
    await post.save();

    return post;
  }

  async updatePost(updatePostDTO: updatePostDTO, user: User, id: number) {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      throw new NotFoundException(`${id} 게시글을 찾을 수 없습니다.`);
    }

    if (post.user.username !== user.username) {
      throw new UnauthorizedException('작성자만 게시글을 수정 할 수 있습니다.');
    }

    post.content = updatePostDTO.content;
    post.subject = updatePostDTO.subject;

    await post.save();

    return post;
  }

  async deletePost(user: User, id: any) {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      throw new NotFoundException(`${id} 게시글을 찾을 수 없습니다.`);
    }

    if (post.user.username !== user.username) {
      throw new UnauthorizedException('작성자만 게시글을 삭제 할 수 있습니다.');
    }

    await this.postRepository.delete({ id });

    return post;
  }
}
