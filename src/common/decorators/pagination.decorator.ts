import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface PaginationParams {
  take: number;
  after?: string;
}

export const DEFAULT_TAKE = 10;

export const Paginate = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const after = request?.query?.after as string | undefined;

    let take: number;

    try {
      take = parseInt(request.query.take as string);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      take = DEFAULT_TAKE;
    }

    if (isNaN(take)) {
      take = DEFAULT_TAKE;
    }

    return { take, after };
  },
);
