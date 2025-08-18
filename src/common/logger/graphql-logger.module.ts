import { Module } from '@nestjs/common';

import { GraphQLLoggerProvider } from './graphql-logger.provider';

@Module({
  providers: [GraphQLLoggerProvider],
  exports: [GraphQLLoggerProvider],
})
export class GraphQLLoggerModule {}
