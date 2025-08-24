import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GraphQLLoggerProvider } from './graphql-logger.provider';

@Module({
  imports: [ConfigModule],
  providers: [GraphQLLoggerProvider],
  exports: [GraphQLLoggerProvider],
})
export class GraphQLLoggerModule {}
