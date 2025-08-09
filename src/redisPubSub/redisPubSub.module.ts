import { Module } from '@nestjs/common';
import { RedisPubSubService } from './redisPubSub.service';

@Module({
  providers: [RedisPubSubService],
  exports: [RedisPubSubService],
})
export class RedisPubSubModule {}
