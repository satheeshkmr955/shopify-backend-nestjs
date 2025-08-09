import { GET_USER_BY_ID } from 'src/constants/subscription';

import { GetUserById } from './user.types';

export interface PubSubEventMap {
  [GET_USER_BY_ID]: [GetUserById];
  [key: string]: any;
}
