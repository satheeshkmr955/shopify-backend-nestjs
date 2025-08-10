import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PrismaModule } from 'src/prisma.module';
import { PlaylistResolver } from './playlist.resolvers';
import { RedisPubSubModule } from 'src/redisPubSub/redisPubSub.module';

@Module({
  imports: [PrismaModule, RedisPubSubModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistResolver],
})
export class PlaylistModule {}
