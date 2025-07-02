import { Artist, Song } from '@prisma/client';

export type SongArtists = Song & {
  artists: Artist[];
};
