import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { PrismaModule } from 'src/prisma.module';
import { SongResolver } from './songs.resolvers';

@Module({
  imports: [PrismaModule],
  controllers: [SongsController],
  providers: [SongsService, SongResolver],
})
export class SongsModule {}
