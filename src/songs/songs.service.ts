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
    const { artists: artistNames, ...restOfSongData } = newSongDto;

    const artistConnectOperations = await Promise.all(
      artistNames.map(async (name) => {
        const artist = await this.prisma.artist.upsert({
          where: { name: name },
          update: {},
          create: { name: name },
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

    const { artists: artistNames, ...restOfSongData } = updateData;

    let artistConnectOperations: { id: string }[] | undefined;

    if (artistNames && artistNames.length > 0) {
      artistConnectOperations = await Promise.all(
        artistNames.map(async (name) => {
          const artist = await this.prisma.artist.upsert({
            where: { name: name },
            update: {},
            create: { name: name },
          });
          return { id: artist.id };
        }),
      );
    }

    const data: Prisma.SongUpdateInput = {
      ...restOfSongData,
    };

    if (restOfSongData.releasedDate) {
      data.releasedDate = new Date(restOfSongData.releasedDate);
    }

    if (artistConnectOperations) {
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
