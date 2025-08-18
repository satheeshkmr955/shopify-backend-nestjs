import { YogaInitialContext } from 'graphql-yoga';

import { RequestUser } from './user.types';

export interface GraphQLContext extends YogaInitialContext {
  req: RequestUser;
  res: Response;
}
