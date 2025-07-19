import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  create() {
    return 'This action adds a new artist';
  }

  findAll() {
    return `This action returns all artist`;
  }

  findOne(id: string) {
    return `This action returns a #${id} artist`;
  }

  async findArtist(userId: string) {
    return await this.prisma.artist.findUnique({
      where: { id: userId },
    });
  }

  update(id: string) {
    return `This action updates a #${id} artist`;
  }

  remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
