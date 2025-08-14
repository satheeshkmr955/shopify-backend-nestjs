import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PrismaModule } from 'src/prisma.module';
import { PlaylistResolver } from './playlist.resolvers';
import { PubSubModule } from 'src/pubSub/PubSub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistResolver],
})
export class PlaylistModule {}
