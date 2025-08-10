import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  songs: Array<Song>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CreatePlaylistInput = {
  name: Scalars['String']['input'];
  songs?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateSongInput = {
  artists: Array<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  lyrics: Scalars['String']['input'];
  releasedDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Enable2FaType = {
  __typename?: 'Enable2FAType';
  secret: Scalars['String']['output'];
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlaylist: Playlist;
  createSong: Song;
  deletePlaylist: Playlist;
  deleteSong: Song;
  deleteUser: User;
  disable2FA?: Maybe<User>;
  enable2FA?: Maybe<Enable2FaType>;
  login?: Maybe<User>;
  signup?: Maybe<User>;
  updatePlaylist: Playlist;
  updateSong: Song;
  updateUser: User;
  validate2FA?: Maybe<ValidateType>;
};


export type MutationCreatePlaylistArgs = {
  input: CreatePlaylistInput;
};


export type MutationCreateSongArgs = {
  input: CreateSongInput;
};


export type MutationDeletePlaylistArgs = {
  input: IdInput;
};


export type MutationDeleteSongArgs = {
  input: IdInput;
};


export type MutationDeleteUserArgs = {
  input: IdInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: CreateUserInput;
};


export type MutationUpdatePlaylistArgs = {
  input: UpdatePlaylistInput;
};


export type MutationUpdateSongArgs = {
  input: UpdateSongInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationValidate2FaArgs = {
  input: ValidateInput;
};

export type PaginateInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginatedPlaylist = {
  __typename?: 'PaginatedPlaylist';
  items: Array<Playlist>;
  pagination: PaginationInfo;
};

export type PaginatedSongs = {
  __typename?: 'PaginatedSongs';
  items: Array<Song>;
  pagination: PaginationInfo;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  items: Array<User>;
  pagination: PaginationInfo;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  after?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  take: Scalars['Int']['output'];
};

export type Playlist = {
  __typename?: 'Playlist';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  songs: Array<Song>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  playlist?: Maybe<Playlist>;
  playlists: PaginatedPlaylist;
  profile?: Maybe<User>;
  song?: Maybe<Song>;
  songs: PaginatedSongs;
  user?: Maybe<User>;
  users: PaginatedUsers;
};


export type QueryPlaylistArgs = {
  input: IdInput;
};


export type QueryPlaylistsArgs = {
  input?: InputMaybe<PaginateInput>;
};


export type QuerySongArgs = {
  input: IdInput;
};


export type QuerySongsArgs = {
  input?: InputMaybe<PaginateInput>;
};


export type QueryUserArgs = {
  input: IdInput;
};


export type QueryUsersArgs = {
  input?: InputMaybe<PaginateInput>;
};

export type Song = {
  __typename?: 'Song';
  artists: Array<Artist>;
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lyrics: Scalars['String']['output'];
  playlist?: Maybe<Playlist>;
  releasedDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  userCreated?: Maybe<User>;
  userUpdated?: Maybe<User>;
};

export type UpdatePlaylistInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  songs?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSongInput = {
  artists?: InputMaybe<Array<Scalars['String']['input']>>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  lyrics?: InputMaybe<Scalars['String']['input']>;
  releasedDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  enable2FA?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  playlists?: InputMaybe<Array<Scalars['String']['input']>>;
  twoFASecret?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  enable2FA: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  playlists?: Maybe<Array<Playlist>>;
  twoFASecret?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ValidateInput = {
  token: Scalars['String']['input'];
};

export type ValidateType = {
  __typename?: 'ValidateType';
  verified: Scalars['Boolean']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Artist: ResolverTypeWrapper<Artist>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatePlaylistInput: CreatePlaylistInput;
  CreateSongInput: CreateSongInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Enable2FAType: ResolverTypeWrapper<Enable2FaType>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IDInput: IdInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaginateInput: PaginateInput;
  PaginatedPlaylist: ResolverTypeWrapper<PaginatedPlaylist>;
  PaginatedSongs: ResolverTypeWrapper<PaginatedSongs>;
  PaginatedUsers: ResolverTypeWrapper<PaginatedUsers>;
  PaginationInfo: ResolverTypeWrapper<PaginationInfo>;
  Playlist: ResolverTypeWrapper<Playlist>;
  Query: ResolverTypeWrapper<{}>;
  Song: ResolverTypeWrapper<Song>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdatePlaylistInput: UpdatePlaylistInput;
  UpdateSongInput: UpdateSongInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  ValidateInput: ValidateInput;
  ValidateType: ResolverTypeWrapper<ValidateType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Artist: Artist;
  Boolean: Scalars['Boolean']['output'];
  CreatePlaylistInput: CreatePlaylistInput;
  CreateSongInput: CreateSongInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  Enable2FAType: Enable2FaType;
  ID: Scalars['ID']['output'];
  IDInput: IdInput;
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  PaginateInput: PaginateInput;
  PaginatedPlaylist: PaginatedPlaylist;
  PaginatedSongs: PaginatedSongs;
  PaginatedUsers: PaginatedUsers;
  PaginationInfo: PaginationInfo;
  Playlist: Playlist;
  Query: {};
  Song: Song;
  String: Scalars['String']['output'];
  Subscription: {};
  UpdatePlaylistInput: UpdatePlaylistInput;
  UpdateSongInput: UpdateSongInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
  ValidateInput: ValidateInput;
  ValidateType: ValidateType;
};

export type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type Enable2FaTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Enable2FAType'] = ResolversParentTypes['Enable2FAType']> = {
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPlaylist?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType, RequireFields<MutationCreatePlaylistArgs, 'input'>>;
  createSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationCreateSongArgs, 'input'>>;
  deletePlaylist?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType, RequireFields<MutationDeletePlaylistArgs, 'input'>>;
  deleteSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationDeleteSongArgs, 'input'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'input'>>;
  disable2FA?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  enable2FA?: Resolver<Maybe<ResolversTypes['Enable2FAType']>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  signup?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updatePlaylist?: Resolver<ResolversTypes['Playlist'], ParentType, ContextType, RequireFields<MutationUpdatePlaylistArgs, 'input'>>;
  updateSong?: Resolver<ResolversTypes['Song'], ParentType, ContextType, RequireFields<MutationUpdateSongArgs, 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  validate2FA?: Resolver<Maybe<ResolversTypes['ValidateType']>, ParentType, ContextType, RequireFields<MutationValidate2FaArgs, 'input'>>;
};

export type PaginatedPlaylistResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedPlaylist'] = ResolversParentTypes['PaginatedPlaylist']> = {
  items?: Resolver<Array<ResolversTypes['Playlist']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedSongsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedSongs'] = ResolversParentTypes['PaginatedSongs']> = {
  items?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginatedUsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedUsers'] = ResolversParentTypes['PaginatedUsers']> = {
  items?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaginationInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginationInfo'] = ResolversParentTypes['PaginationInfo']> = {
  after?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  take?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Playlist'] = ResolversParentTypes['Playlist']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  songs?: Resolver<Array<ResolversTypes['Song']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType, RequireFields<QueryPlaylistArgs, 'input'>>;
  playlists?: Resolver<ResolversTypes['PaginatedPlaylist'], ParentType, ContextType, Partial<QueryPlaylistsArgs>>;
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QuerySongArgs, 'input'>>;
  songs?: Resolver<ResolversTypes['PaginatedSongs'], ParentType, ContextType, Partial<QuerySongsArgs>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>;
  users?: Resolver<ResolversTypes['PaginatedUsers'], ParentType, ContextType, Partial<QueryUsersArgs>>;
};

export type SongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = {
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lyrics?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playlist?: Resolver<Maybe<ResolversTypes['Playlist']>, ParentType, ContextType>;
  releasedDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userCreated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userCreated", ParentType, ContextType>;
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  enable2FA?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playlists?: Resolver<Maybe<Array<ResolversTypes['Playlist']>>, ParentType, ContextType>;
  twoFASecret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidateType'] = ResolversParentTypes['ValidateType']> = {
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Artist?: ArtistResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Enable2FAType?: Enable2FaTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedPlaylist?: PaginatedPlaylistResolvers<ContextType>;
  PaginatedSongs?: PaginatedSongsResolvers<ContextType>;
  PaginatedUsers?: PaginatedUsersResolvers<ContextType>;
  PaginationInfo?: PaginationInfoResolvers<ContextType>;
  Playlist?: PlaylistResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidateType?: ValidateTypeResolvers<ContextType>;
};

