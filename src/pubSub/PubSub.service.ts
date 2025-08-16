import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createPubSub, PubSub } from 'graphql-yoga';
import { Kafka, Producer, Consumer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';
import {
  createKafkaEventTarget,
  CreateKafkaEventTargetArgs,
} from './kafka.eventTarget';

import { dynamicImport } from 'src/utils/dynamicImport';

import type { KafkaConfig } from 'kafkajs';
import type SuperJSON from 'superjson';
import { PubSubEventMap } from 'src/generated/pubsub-event-map';

@Injectable()
export class PubSubService implements OnModuleInit, OnModuleDestroy {
  public pubSub: PubSub<PubSubEventMap>;
  private producerKafka: Producer;
  private consumerKafka: Consumer;
  private configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
  }

  async onModuleInit() {
    try {
      const superJson = (await dynamicImport<SuperJSON>('superjson')).default;

      const kafkaClientId = this.configService.get<string>(
        'KAFKA_CLIENT_ID',
      ) as string;
      const kafkaBrokers = this.configService.get<string>(
        'KAFKA_BROKERS',
      ) as string;
      const kafkaGroupId = this.configService.get<string>(
        'KAFKA_GROUP_ID',
      ) as string;

      if (!kafkaClientId || !kafkaBrokers || !kafkaGroupId) {
        throw new Error(
          'Kafka environment variables are not configured correctly.',
        );
      }

      const kafkaConfig: KafkaConfig = {
        clientId: kafkaClientId,
        brokers: kafkaBrokers.split(','),
      };

      const kafka = new Kafka(kafkaConfig);
      this.producerKafka = kafka.producer();
      this.consumerKafka = kafka.consumer({ groupId: kafkaGroupId });

      await this.producerKafka.connect();
      await this.consumerKafka.connect();

      const config: CreateKafkaEventTargetArgs = {
        producer: this.producerKafka,
        consumer: this.consumerKafka,
        serializer: {
          stringify: (message: PubSubEventMap) => superJson.stringify(message),
          parse: (str: string) => superJson.parse(str),
        },
      };

      const eventTarget = createKafkaEventTarget(config);
      this.pubSub = createPubSub({ eventTarget });
    } catch (error) {
      console.error('Failed to initialize PubSubService:', error);
      // Re-throw the error to prevent the application from starting with a broken service
      throw error;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.producerKafka) {
        await this.producerKafka.disconnect();
      }
      if (this.consumerKafka) {
        await this.consumerKafka.disconnect();
      }
    } catch (error) {
      console.error('Error while closing Kafka connections:', error);
    }
  }
}
