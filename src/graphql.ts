
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

export class UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    twoFASecret?: Nullable<string>;
    enable2FA?: Nullable<boolean>;
    playlists?: Nullable<string[]>;
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

    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract user(input: IDInput): Nullable<User> | Promise<Nullable<User>>;

    abstract users(input?: Nullable<PaginateInput>): PaginatedUsers | Promise<PaginatedUsers>;
}

export abstract class IMutation {
    abstract createSong(input: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(input: UpdateSongInput): Song | Promise<Song>;

    abstract deleteSong(input: IDInput): Song | Promise<Song>;

    abstract updateUser(input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(input: IDInput): User | Promise<User>;
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

export class PaginatedUsers {
    items: User[];
    pagination: PaginationInfo;
}

export type DateTimeISO = any;
type Nullable<T> = T | null;
