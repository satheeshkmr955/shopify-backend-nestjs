import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { JwtPayload } from 'src/common/types/jwt.types';
import { RequestUser } from 'src/common/types/user.types';

@Injectable()
export class JwtArtistGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: RequestUser }>().req;
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
