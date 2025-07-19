import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { ArtistService } from 'src/artist/artist.service';

import { LoginDTO } from './dto/auth.schema';

import { JwtPayload } from 'src/common/types/jwt.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private artistService: ArtistService,
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.userService.findOneByEmail(loginDTO.email, true);

    const passwordMatched = await compare(loginDTO.password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Please check your credential');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const payload: JwtPayload = { email: user.email, id: user.id };

    const artist = await this.artistService.findArtist(user.id);

    if (artist) {
      payload.artistId = artist.id;
    }

    const accessToken = this.jwtService.sign(payload);

    return { ...userWithoutPassword, accessToken };
  }
}
