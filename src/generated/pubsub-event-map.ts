import { ResolversTypes } from './graphql';

export interface PubSubEventMap {
  playlistCreated: [{ playlistCreated: ResolversTypes['Playlist'] }];
  playlistDeleted: [{ playlistDeleted: ResolversTypes['Playlist'] }];
  playlistUpdated: [{ playlistUpdated: ResolversTypes['Playlist'] }];
  userCreated: [{ userCreated: ResolversTypes['User'] }];
  userDeleted: [{ userDeleted: ResolversTypes['User'] }];
  userUpdated: [{ userUpdated: ResolversTypes['User'] }];
  [key: string]: any;
}
