import { Artist, Song } from '@prisma/client';

export type ArtistSong = Artist & {
  songs: SongArtists[];
};

export type SongArtists = Song & {
  artists: ArtistSong[];
};
