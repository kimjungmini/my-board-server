import { EntityRepository, Repository } from 'typeorm';
import { signupDto } from './dto/signupDto';
import { User } from './user.entity';
import * as bycrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupDto: signupDto) {
    const { username, password } = signupDto;

    const salt = await bycrypt.genSalt(10);
    const hashedpassword = await bycrypt.hash(password, salt);

    const user = this.create({ username, password: hashedpassword });
    await this.save(user);

    return user;
  }
}
