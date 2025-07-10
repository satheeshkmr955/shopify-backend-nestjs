import { Playlist, Song } from '@prisma/client';

export type PlaylistSong = Playlist & {
  songs: Song[];
};
