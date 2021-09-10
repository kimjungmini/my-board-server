import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signupDto } from './dto/signupDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * @param username 유저 아이디
   * 유저아이디가 일치하는 데이터를 찾아서 꺼내줌
   */
  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  signup(@Body(ValidationPipe) signupDto: signupDto) {
    return this.userService.signup(signupDto);
  }

  @Put()
  changePassword(@Body(ValidationPipe) changUserinfo: changUserInfo) {
    return this.userService.changeUserInfo(changUserinfo);
  }

  @Delete('/:username')
  deleteUserByUsername(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }
}
