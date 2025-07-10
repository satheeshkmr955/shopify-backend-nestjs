import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { CreatePlaylistDTO, UpdatePlaylistDTO } from './dto/playlist.schema';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { findAllPaginate, PrismaModel } from 'src/common/utils/pagination.util';

import type { PlaylistSong } from 'src/common/types/playlist';

const userId = 'gJY_4F-8xRm9hIAgGQMTv';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async create(newPlaylistDto: CreatePlaylistDTO) {
    const { songs: songIds, ...restOfPlaylistData } = newPlaylistDto;

    let songConnectOperations: { id: string }[] | undefined;

    if (Array.isArray(songIds)) {
      songConnectOperations = await this.prisma.song.findMany({
        where: {
          id: {
            in: songIds,
          },
        },
        select: { id: true },
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const data: Prisma.PlaylistCreateInput = {
      name: restOfPlaylistData.name,
      user: { connect: user },
    };

    if (songConnectOperations) {
      data.songs = {
        connect: songConnectOperations,
      };
    }

    return this.prisma.playlist.create({
      data,
      include: { songs: true },
    });
  }

  async findAll(pagination: PaginationParams) {
    const model = this.prisma.playlist as unknown as PrismaModel<PlaylistSong>;

    const query: Prisma.PlaylistFindManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      include: { songs: true },
    };

    const config = {
      pagination: pagination,
      model: model,
      query: query,
      afterType: 'id',
    };

    return await findAllPaginate<PlaylistSong>(config);
  }

  async findOne(id: string) {
    const playlist = await this.prisma.playlist.findUnique({
      where: { id },
      include: { songs: true },
    });
    if (!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`);
    }
    return playlist;
  }

  async update(id: string, updateData: UpdatePlaylistDTO) {
    await this.findOne(id);

    const { songs: songIds, ...restOfPlaylistData } = updateData;

    let songConnectOperations: { id: string }[] | undefined;

    if (Array.isArray(songIds)) {
      songConnectOperations = await this.prisma.song.findMany({
        where: {
          id: {
            in: songIds,
          },
        },
        select: { id: true },
      });
    }

    const data: Prisma.PlaylistUpdateInput = {
      ...restOfPlaylistData,
    };

    if (songConnectOperations) {
      data.songs = {
        set: songConnectOperations,
      };
    }

    return await this.prisma.playlist.update({
      where: { id },
      data,
      include: { songs: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.playlist.delete({
      where: { id },
      include: { songs: true },
    });
  }
}
