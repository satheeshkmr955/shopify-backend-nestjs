import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { DateTimeISOResolver } from 'graphql-scalars';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_FILTER } from '@nestjs/core';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
import Redis from 'ioredis';
import { useResponseCache } from '@envelop/response-cache';
import { createRedisCache } from '@envelop/response-cache-redis';


import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './artist/artist.module';
import { PubSubModule } from './pubSub/PubSub.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLBadRequestFilter } from './common/filters/graphql-bad-request.filter';
import { useSetResponseHeader } from './utils/getResponseHeader';

import { GraphQLContext } from './common/types/graphql.types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL') as string;
        const redis = new Redis(redisUrl);
        const cache = createRedisCache({ redis });

        const isDev = configService.get<string>('NODE_ENV') === 'development';

        return {
          typePaths: ['./**/*.graphql'],
          resolvers: { DateTime: DateTimeISOResolver },
          context: ({ req, res }: GraphQLContext) => ({
            req,
            res,
          }),
          plugins: [
            EnvelopArmorPlugin(),
            useSetResponseHeader(),
            useResponseCache({
              cache,
              session: ({ req }: GraphQLContext) => req?.user?.id ?? null,
              includeExtensionMetadata: isDev,
              ttl: 1000 * 60 * 60 * 1, // 1 hour
            }),
          ],
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
            outputAs: 'class',
          },
        };
      },
    }),
    SongsModule,
    PlaylistModule,
    UserModule,
    AuthModule,
    ArtistModule,
    PubSubModule,
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
