import { EntityRepository, Repository } from 'typeorm';
import { signupDto } from './dto/signupDto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupDto: signupDto) {
    const { username, password } = signupDto;

    const user = this.create({ username, password });
    await this.save(user);

    return user;
  }
}
