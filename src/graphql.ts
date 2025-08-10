
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class ValidateInput {
    token: string;
}

export class PaginateInput {
    take?: Nullable<number>;
    after?: Nullable<string>;
}

export class IDInput {
    id: string;
}

export class CreatePlaylistInput {
    name: string;
    songs?: Nullable<string[]>;
}

export class UpdatePlaylistInput {
    id: string;
    name?: Nullable<string>;
    songs?: Nullable<string[]>;
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
    songs?: Nullable<Song[]>;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class Enable2FAType {
    secret: string;
}

export class ValidateType {
    verified: boolean;
}

export abstract class IMutation {
    abstract signup(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract login(input: LoginInput): Nullable<User> | Promise<Nullable<User>>;

    abstract validate2FA(input: ValidateInput): Nullable<ValidateType> | Promise<Nullable<ValidateType>>;

    abstract enable2FA(): Nullable<Enable2FAType> | Promise<Nullable<Enable2FAType>>;

    abstract disable2FA(): Nullable<User> | Promise<Nullable<User>>;

    abstract createPlaylist(input: CreatePlaylistInput): Playlist | Promise<Playlist>;

    abstract updatePlaylist(input: UpdatePlaylistInput): Playlist | Promise<Playlist>;

    abstract deletePlaylist(input: IDInput): Playlist | Promise<Playlist>;

    abstract createSong(input: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(input: UpdateSongInput): Song | Promise<Song>;

    abstract deleteSong(input: IDInput): Song | Promise<Song>;

    abstract updateUser(input: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(input: IDInput): User | Promise<User>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract playlistCreated(): Nullable<Playlist> | Promise<Nullable<Playlist>>;

    abstract playlistUpdated(): Nullable<Playlist> | Promise<Nullable<Playlist>>;

    abstract playlistDeleted(): Nullable<Playlist> | Promise<Nullable<Playlist>>;

    abstract userUpdated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userDeleted(): Nullable<User> | Promise<Nullable<User>>;
}

export class PaginationInfo {
    take: number;
    after?: Nullable<string>;
    hasNextPage: boolean;
}

export class Playlist {
    id: string;
    name: string;
    songs?: Nullable<Song[]>;
    user: User;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class PaginatedPlaylist {
    items: Playlist[];
    pagination: PaginationInfo;
}

export abstract class IQuery {
    abstract playlist(input: IDInput): Nullable<Playlist> | Promise<Nullable<Playlist>>;

    abstract playlists(input?: Nullable<PaginateInput>): PaginatedPlaylist | Promise<PaginatedPlaylist>;

    abstract song(input: IDInput): Nullable<Song> | Promise<Nullable<Song>>;

    abstract songs(input?: Nullable<PaginateInput>): PaginatedSongs | Promise<PaginatedSongs>;

    abstract profile(): Nullable<User> | Promise<Nullable<User>>;

    abstract user(input: IDInput): Nullable<User> | Promise<Nullable<User>>;

    abstract users(input?: Nullable<PaginateInput>): PaginatedUsers | Promise<PaginatedUsers>;
}

export class Song {
    id: string;
    title: string;
    releasedDate: DateTimeISO;
    duration: number;
    lyrics: string;
    artists?: Nullable<Artist[]>;
    playlist?: Nullable<Playlist>;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
}

export class PaginatedSongs {
    items: Song[];
    pagination: PaginationInfo;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    twoFASecret?: Nullable<string>;
    enable2FA: boolean;
    playlists?: Nullable<Playlist[]>;
    createdAt: DateTimeISO;
    updatedAt: DateTimeISO;
    accessToken?: Nullable<string>;
}

export class PaginatedUsers {
    items: User[];
    pagination: PaginationInfo;
}

export type DateTimeISO = any;
type Nullable<T> = T | null;
