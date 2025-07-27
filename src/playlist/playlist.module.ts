import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PrismaModule } from 'src/prisma.module';
import { PlaylistResolver } from './playlist.resolvers';

@Module({
  imports: [PrismaModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistResolver],
})
export class PlaylistModule {}
