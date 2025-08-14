import { Module } from '@nestjs/common';
import { PubSubService } from './PubSub.service';

@Module({
  providers: [PubSubService],
  exports: [PubSubService],
})
export class PubSubModule {}
