
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class PaginateInput {
    take?: Nullable<number>;
    after?: Nullable<string>;
}

export class IDInput {
    id: string;
}

export class CreateSongInput {
    title: string;
    artists: string[];
    releasedDate: DateTimeISO;
    duration: number;
    lyrics: string;
}

export class UpdateSongInput {
    id: string;
    title?: Nullable<string>;
    artists?: Nullable<string[]>;
    releasedDate?: Nullable<DateTimeISO>;
    duration?: Nullable<number>;
    lyrics?: Nullable<string>;
}

export class Artist {
    id: string;
    name: string;
    songs: Song[];
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class Playlist {
    id: string;
    name: string;
    songs: Song[];
    user: User;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class PaginationInfo {
    take: number;
    after?: Nullable<string>;
    hasNextPage: boolean;
}

export class Song {
    id: string;
    title: string;
    releasedDate: DateTimeISO;
    duration: number;
    lyrics: string;
    artists: Artist[];
    playlist?: Nullable<Playlist>;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class PaginatedSongs {
    items: Song[];
    pagination: PaginationInfo;
}

export abstract class IQuery {
    abstract song(input: IDInput): Nullable<Song> | Promise<Nullable<Song>>;

    abstract songs(input?: Nullable<PaginateInput>): PaginatedSongs | Promise<PaginatedSongs>;
}

export abstract class IMutation {
    abstract createSong(input: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(input: UpdateSongInput): Song | Promise<Song>;

    abstract deleteSong(input: IDInput): Song | Promise<Song>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    twoFASecret?: Nullable<string>;
    enable2FA: boolean;
    playlists: Playlist[];
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export type DateTimeISO = any;
type Nullable<T> = T | null;
