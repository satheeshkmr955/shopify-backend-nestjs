import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import * as QRCode from 'qrcode';

import { UserService } from 'src/user/user.service';
import { ArtistService } from 'src/artist/artist.service';

import { LoginDTO } from './dto/auth.schema';

import { JwtPayload } from 'src/common/types/jwt.types';
import { Enable2FAType } from 'src/common/types/auth.types';

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

    // if (user.enable2FA && user.twoFASecret) {
    //   return {
    //     validate2FA: 'http://localhost:3000/auth/validate-2fa',
    //     message:
    //       'Please send the one-time password/token from your Google Authenticator App',
    //   };
    // }

    return { ...userWithoutPassword, accessToken };
  }

  async enable2FA(userId: string): Promise<Enable2FAType> {
    const user = await this.userService.findOne(userId);

    const response = {
      secret: '',
    };

    if (user.enable2FA) {
      const secret = user.twoFASecret as string;
      response.secret = secret;
      // const qrCodeObject = await this.getQRCodeImage(user.email, secret);
      // response['image'] = qrCodeObject.imageUrl;
      return response;
    }

    const secret = authenticator.generateSecret();
    response.secret = secret;

    await this.userService.updateSecretKey(user.id, secret, true);

    // const qrCodeObject = await this.getQRCodeImage(user.email, secret);
    // response['image'] = qrCodeObject.imageUrl;

    return response;
  }

  async disable2FA(userId: string) {
    return this.userService.updateSecretKey(userId, null, false);
  }

  async validate2FAToken(
    userId: string,
    token: string,
  ): Promise<{ verified: boolean }> {
    const user = await this.userService.findOne(userId);
    const secret = (user?.twoFASecret as string) || '';

    const verified = authenticator.verify({
      token: token,
      secret: secret,
    });

    return { verified };
  }

  async getQRCodeImage(
    email: string,
    secret: string,
  ): Promise<{ imageUrl: string }> {
    const service = 'shopify-backend';
    const otpauth = authenticator.keyuri(email, service, secret);
    const QRCodeImage = await QRCode.toDataURL(otpauth);
    return { imageUrl: QRCodeImage };
  }
}
