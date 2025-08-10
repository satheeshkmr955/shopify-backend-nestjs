import { ResolversTypes } from './graphql';

export interface PubSubEventMap {
  userCreated: [{ userCreated: ResolversTypes['User'] }];
  userDeleted: [{ userDeleted: ResolversTypes['User'] }];
  userUpdated: [{ userUpdated: ResolversTypes['User'] }];
  [key: string]: any;
}
