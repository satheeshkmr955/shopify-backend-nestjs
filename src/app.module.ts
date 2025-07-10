import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SongsModule, PlaylistModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
