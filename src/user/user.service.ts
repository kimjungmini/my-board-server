import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { changUserInfo } from './dto/changUserInfo.dto';
import { signinDTO } from './dto/signin.dto';
import { signupDto } from './dto/signupDto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

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

  async signIn(signinDTO: signinDTO) {
    const { username, password } = signinDTO;
    const user = await this.userRepository.findOne({ username });

    if (user && user.password === password) {
      // 유저 토큰 생성
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
