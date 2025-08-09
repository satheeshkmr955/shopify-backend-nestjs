import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { DateTimeISOResolver } from 'graphql-scalars';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_FILTER } from '@nestjs/core';

import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { EventsModule } from './events/events.module';
import { RedisPubSubModule } from './redisPubSub/redisPubSub.module';
import { GraphQLBadRequestFilter } from './common/filters/graphql-bad-request.filter';
import { RequestUser } from './common/types/user.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      typePaths: ['./**/*.graphql'],
      resolvers: { DateTime: DateTimeISOResolver },
      context: ({ req, res }: { req: RequestUser; res: Response }) => ({
        req,
        res,
      }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
    }),
    SongsModule,
    PlaylistModule,
    UserModule,
    AuthModule,
    ArtistModule,
    EventsModule,
    RedisPubSubModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DateTime',
      useValue: DateTimeISOResolver,
    },
    {
      provide: APP_FILTER,
      useClass: GraphQLBadRequestFilter,
    },
  ],
})
export class AppModule {}
