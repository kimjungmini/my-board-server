import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/getUser.decorator';
import { User } from 'src/user/user.entity';
import { createPostDTO } from './dto/createPost.dto';
import { updatePostDTO } from './dto/updatePost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getPostDetail(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostDetail(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createPost(
    @Body(ValidationPipe) createPostDTO: createPostDTO,
    @GetUser() user: User,
  ) {
    console.log(createPostDTO);
    console.log(user);
    return this.postService.createPost(createPostDTO, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  updatePost(
    @Body(ValidationPipe) updatePostDTO: updatePostDTO,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id,
  ) {
    return this.postService.updatePost(updatePostDTO, user, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePost(@GetUser() user: User, @Param('id', ParseIntPipe) id) {
    return this.postService.deletePost(user, id);
  }
}
