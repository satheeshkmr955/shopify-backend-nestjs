import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { DateTimeISOResolver } from 'graphql-scalars';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_FILTER } from '@nestjs/core';
import { EnvelopArmorPlugin } from '@escape.tech/graphql-armor';
import Redis from 'ioredis';
import { useResponseCache } from '@envelop/response-cache';
import { createRedisCache } from '@envelop/response-cache-redis';
import { GraphQLError } from 'graphql';
import { useMaskedErrors } from '@envelop/core';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'crypto';

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
import { graphqlLogger } from './common/plugins/graphql-logger.plugin';
import { GraphQLLoggerModule } from './common/logger/graphql-logger.module';

import { GraphQLContext } from './common/types/graphql.types';
import type { TransportTargetOptions } from 'pino';

const logDir = join(__dirname, '..', 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const logFilePath = join(logDir, `http_shopify.log`);

const targets: TransportTargetOptions[] = [];

targets.push({
  target: 'pino-roll',
  options: {
    file: logFilePath,
    frequency: 'daily',
    mkdir: true,
    size: '10M',
    limit: {
      count: 10,
    },
  },
});

if (process.env.NODE_ENV === 'development') {
  targets.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
      singleLine: true,
    },
  });
}

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: targets,
        },
        level: process.env.LOG_LEVEL || 'info',
        genReqId: (req) => {
          // Check for a pre-existing header first, or generate a new UUID
          const reqId = req.headers['x-request-id'] || randomUUID();
          req.headers['x-request-id'] = reqId; // Set the header for the downstream logger to use
          return reqId;
        },
        redact: {
          paths: ['req.headers.cookie', 'req.headers.authorization'],
          censor: '***MASKED***', // Optional: specify the replacement value
        },
        customProps: () => ({
          service: 'http-api',
          env: process.env.NODE_ENV,
        }),
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      imports: [ConfigModule, GraphQLLoggerModule],
      inject: [ConfigService, 'GraphQLLogger'],
      useFactory: (configService: ConfigService, logger: PinoLogger) => {
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
              session: ({ req }: GraphQLContext) => {
                // Only scope cache per user for user-specific queries
                const userId = req?.user?.id ?? null;
                return userId;
              },
              ttlPerSchemaCoordinate: {
                'Query.songs': 1000 * 30, // 30s cache for songs list
                'Query.users': 1000 * 30, // 30s cache for users list
                'Query.playlists': 1000 * 30, // 30s cache for playlists
                'Query.profile': 1000 * 60 * 10, // 10 minutes cache for logged-in user's profile
              },
              ttlPerType: {
                Artist: 1000 * 60 * 10, // 10 minutes,
              },
              includeExtensionMetadata: isDev,
              ttl: 1000 * 60 * 5, // default 5 minutes
            }),
            useMaskedErrors({
              maskError: (originalError) => {
                return originalError as GraphQLError;
              },
            }),
            graphqlLogger(logger),
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
