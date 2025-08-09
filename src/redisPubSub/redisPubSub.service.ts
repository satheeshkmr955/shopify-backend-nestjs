import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPubSub, PubSub } from 'graphql-yoga';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import {
  createRedisEventTarget,
  CreateRedisEventTargetArgs,
} from '@graphql-yoga/redis-event-target';

import { dynamicImport } from 'src/utils/dynamicImport';

import type SuperJSON from 'superjson';
import { PubSubEventMap } from 'src/common/types/pubsub.types';

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  public pubSub: PubSub<PubSubEventMap>;
  private publishClient: Redis;
  private subscribeClient: Redis;
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async init() {
    const superJson = (await dynamicImport<SuperJSON>('superjson')).default;

    this.publishClient = new Redis(
      this.configService.get('REDIS_URL') as string,
    );
    this.subscribeClient = new Redis(
      this.configService.get('REDIS_URL') as string,
    );

    const config: CreateRedisEventTargetArgs = {
      publishClient: this.publishClient,
      subscribeClient: this.subscribeClient,
      serializer: {
        stringify: (message: PubSubEventMap) => superJson.stringify(message),
        parse: (str: string) => superJson.parse(str),
      },
    };

    const eventTarget = createRedisEventTarget(config);
    this.pubSub = createPubSub({ eventTarget });
  }

  async onModuleInit() {
    await this.init();
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.publishClient.quit();
      await this.subscribeClient.quit();
    } catch (error) {
      console.error('Error while closing Redis connections:', error);
    }
  }
}
