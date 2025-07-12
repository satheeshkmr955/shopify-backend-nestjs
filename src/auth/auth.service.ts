import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';

import { LoginDTO } from './dto/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOneByEmail(loginDTO.email, true);

    const passwordMatched = await compare(loginDTO.password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Please check your credential');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const payload = { email: user.email, id: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { ...userWithoutPassword, accessToken };
  }
}
