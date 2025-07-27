import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IDInput, Song } from 'src/graphql';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtArtistGuard } from 'src/auth/jwt.guard';

import { SongsService } from './songs.service';
import {
  CreateSongDTO,
  CreateSongSchema,
  UpdateSongDTO,
  UpdateSongSchema,
} from './dto/song.schema';

@Resolver()
@UseGuards(JwtAuthGuard)
export class SongResolver {
  constructor(private readonly songService: SongsService) {}

  @Query('songs')
  async getSongs(@Args('input') pagination: PaginationParams) {
    return await this.songService.findAll(pagination);
  }

  @Query('song')
  async getSong(@Args('input') input: IDInput) {
    return await this.songService.findOne(input.id);
  }

  @Mutation(() => Song)
  @UseGuards(JwtArtistGuard)
  async createSong(
    @Args('input', new ZodValidationPipe(CreateSongSchema))
    input: CreateSongDTO,
  ) {
    return await this.songService.create(input);
  }

  @Mutation(() => Song)
  async updateSong(
    @Args('input', new ZodValidationPipe(UpdateSongSchema))
    input: UpdateSongDTO,
  ) {
    return await this.songService.update(input.id, input);
  }

  @Mutation(() => Song)
  async deleteSong(
    @Args('input')
    input: IDInput,
  ) {
    return await this.songService.remove(input.id);
  }
}
