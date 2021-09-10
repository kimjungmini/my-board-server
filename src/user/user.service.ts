import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signupDto } from './dto/signupDto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new NotFoundException(
        `${username}에 해당하는 유저를 찾을수 없습니다.!`,
      );
    }

    return user;
  }

  deleteUserByUsername(username: string) {
    this.userRepository.delete({ username });
  }

  signup(signupDto: signupDto) {
    return this.userRepository.signup(signupDto);
  }

  async changeUserInfo(changUserinfo: changUserInfo) {
    const user = await this.getUserByUsername(changUserinfo.username);

    user.password = changUserinfo.password;
    await user.save();

    return user;
  }
}
