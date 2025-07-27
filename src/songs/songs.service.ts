import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateSongDTO, UpdateSongDTO } from './dto/song.schema';
import { PrismaService } from 'src/prisma.service';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { findAllPaginate, PrismaModel } from 'src/common/utils/pagination.util';
import type { SongArtists } from 'src/common/types/songs.types';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async create(newSongDto: CreateSongDTO) {
    const { artists: artistIds, ...restOfSongData } = newSongDto;

    const users = await this.prisma.user.findMany({
      where: { id: { in: artistIds } },
      select: { id: true, firstName: true, lastName: true },
    });

    const artistConnectOperations = await Promise.all(
      users.map(async (obj) => {
        const { firstName = '', lastName = '', id = '' } = obj || {};
        const name = `${firstName} ${lastName}`;
        const artist = await this.prisma.artist.upsert({
          where: { name, id },
          update: {},
          create: { name, id },
        });
        return { id: artist.id };
      }),
    );

    const data: Prisma.SongCreateInput = {
      title: restOfSongData.title,
      releasedDate: new Date(restOfSongData.releasedDate),
      duration: restOfSongData.duration,
      lyrics: restOfSongData.lyrics,
      artists: {
        connect: artistConnectOperations,
      },
    };

    return this.prisma.song.create({
      data,
      include: { artists: true },
    });
  }

  async findAll(pagination: PaginationParams) {
    const model = this.prisma.song as unknown as PrismaModel<SongArtists>;

    const query: Prisma.SongFindManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      include: { artists: true },
    };

    const config = {
      pagination: pagination,
      model: model,
      query: query,
      afterType: 'id',
    };

    return await findAllPaginate<SongArtists>(config);
  }

  async findOne(id: string) {
    const song = await this.prisma.song.findUnique({
      where: { id },
      include: { artists: true },
    });
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    return song;
  }

  async update(id: string, updateData: UpdateSongDTO) {
    await this.findOne(id);

    const { artists: artistIds = [], ...restOfSongData } = updateData;

    const users = await this.prisma.user.findMany({
      where: { id: { in: artistIds } },
      select: { id: true, firstName: true, lastName: true },
    });

    const artistConnectOperations = await Promise.all(
      users.map(async (obj) => {
        const { firstName = '', lastName = '', id = '' } = obj || {};
        const name = `${firstName} ${lastName}`;
        const artist = await this.prisma.artist.upsert({
          where: { name, id },
          update: {},
          create: { name, id },
        });
        return { id: artist.id };
      }),
    );

    const data: Prisma.SongUpdateInput = {
      ...restOfSongData,
    };

    if (restOfSongData.releasedDate) {
      data.releasedDate = new Date(restOfSongData.releasedDate);
    }

    if (artistConnectOperations.length) {
      data.artists = {
        set: artistConnectOperations,
      };
    }

    return await this.prisma.song.update({
      where: { id },
      data,
      include: { artists: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.song.delete({
      where: { id },
      include: { artists: true },
    });
  }
}
