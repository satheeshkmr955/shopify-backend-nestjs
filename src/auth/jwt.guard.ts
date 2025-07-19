import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { JwtPayload } from 'src/common/types/jwt.types';

@Injectable()
export class JwtArtistGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest<TUser = JwtPayload>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (user?.artistId) {
      return user;
    }
    throw err || new UnauthorizedException();
  }
}
