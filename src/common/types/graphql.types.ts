import { RequestUser } from './user.types';

export type GraphQLContext = { req: RequestUser; res: Response };
