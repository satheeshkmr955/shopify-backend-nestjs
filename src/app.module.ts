import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SongsModule,
    PlaylistModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
