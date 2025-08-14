import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IDInput, Playlist } from 'src/graphql';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { PlaylistService } from './playlist.service';
import {
  CreatePlaylistDTO,
  CreatePlaylistSchema,
  UpdatePlaylistDTO,
  UpdatePlaylistSchema,
} from './dto/playlist.schema';
import { PubSubService } from 'src/pubSub/PubSub.service';
import {
  PLAYLIST_CREATED,
  PLAYLIST_DELETED,
  PLAYLIST_UPDATED,
} from 'src/constants/events.constant';

import { RequestUser } from 'src/common/types/user.types';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PlaylistResolver {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly pubSubService: PubSubService,
  ) {}

  @Query('playlists')
  async getPlaylists(@Args('input') pagination: PaginationParams) {
    return await this.playlistService.findAll(pagination);
  }

  @Query('playlist')
  async getPlaylist(@Args('input') input: IDInput) {
    return await this.playlistService.findOne(input.id);
  }

  @Mutation(() => Playlist)
  async createPlaylist(
    @Args('input', new ZodValidationPipe(CreatePlaylistSchema))
    input: CreatePlaylistDTO,
    @Context() context: { req: RequestUser; res: Response },
  ) {
    const user = context.req.user;
    const playlistCreated = await this.playlistService.create(input, user);
    this.pubSubService.pubSub.publish(PLAYLIST_CREATED, {
      playlistCreated,
    });
    return playlistCreated;
  }

  @Mutation(() => Playlist)
  async updatePlaylist(
    @Args('input', new ZodValidationPipe(UpdatePlaylistSchema))
    input: UpdatePlaylistDTO,
  ) {
    const playlistUpdated = await this.playlistService.update(input.id, input);
    this.pubSubService.pubSub.publish(PLAYLIST_UPDATED, {
      playlistUpdated,
    });
    return playlistUpdated;
  }

  @Mutation(() => Playlist)
  async deletePlaylist(
    @Args('input')
    input: IDInput,
  ) {
    const playlistDeleted = await this.playlistService.remove(input.id);
    this.pubSubService.pubSub.publish(PLAYLIST_DELETED, {
      playlistDeleted,
    });
    return playlistDeleted;
  }

  @Subscription(() => Playlist)
  playlistCreated() {
    return this.pubSubService.pubSub.subscribe(PLAYLIST_CREATED);
  }

  @Subscription(() => Playlist)
  playlistUpdated() {
    return this.pubSubService.pubSub.subscribe(PLAYLIST_UPDATED);
  }

  @Subscription(() => Playlist)
  playlistDeleted() {
    return this.pubSubService.pubSub.subscribe(PLAYLIST_DELETED);
  }
}
