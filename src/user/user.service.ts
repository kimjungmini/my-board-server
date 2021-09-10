import { Inject, Injectable } from '@nestjs/common';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signupDto } from './dto/signupDto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ username });
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
