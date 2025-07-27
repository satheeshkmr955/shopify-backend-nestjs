import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { RequestUser } from 'src/common/types/user.types';

@Resolver()
@UseGuards(JwtAuthGuard)
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

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
    return await this.playlistService.create(input, context.req.user);
  }

  @Mutation(() => Playlist)
  async updatePlaylist(
    @Args('input', new ZodValidationPipe(UpdatePlaylistSchema))
    input: UpdatePlaylistDTO,
  ) {
    return await this.playlistService.update(input.id, input);
  }

  @Mutation(() => Playlist)
  async deletePlaylist(
    @Args('input')
    input: IDInput,
  ) {
    return await this.playlistService.remove(input.id);
  }
}
