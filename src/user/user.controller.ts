import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signinDTO } from './dto/signin.dto';
import { signupDto } from './dto/signupDto';
import { GetUser } from './getUser.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @param username 유저 아이디
   * 유저아이디가 일치하는 데이터를 찾아서 꺼내줌
   */
  @Get('/:username')
  @UseGuards(AuthGuard())
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  signup(@Body(ValidationPipe) signupDto: signupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) signindto: signinDTO) {
    return this.userService.signIn(signindto);
  }

  @Put()
  changePassword(@Body(ValidationPipe) changUserinfo: changUserInfo) {
    return this.userService.changeUserInfo(changUserinfo);
  }

  @Delete('/:username')
  @UseGuards(AuthGuard())
  deleteUserByUsername(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
