import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signupDto } from './dto/signupDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Post()
  signup(@Body() signupDto: signupDto) {
    return this.userService.signup(signupDto);
  }

  @Put()
  changePassword(@Body() changUserinfo: changUserInfo) {
    return this.userService.changeUserInfo(changUserinfo);
  }
  @Delete('/:username')
  deleteUserByUsername(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }
}
