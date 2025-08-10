import { ResolversTypes } from './graphql';

export interface PubSubEventMap {
  userCreated: [{ userCreated: ResolversTypes['User'] }];
  userUpdated: [{ userUpdated: ResolversTypes['User'] }];
  [key: string]: any;
}
