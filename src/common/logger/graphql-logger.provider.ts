import { Logger } from 'pino';
import pino from 'pino';

export const GraphQLLoggerProvider = {
  provide: 'GraphQLLogger',
  useFactory: (): Logger => {
    return pino({
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
      base: {
        service: 'graphql-api',
        env: process.env.NODE_ENV,
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      hooks: {
        logMethod(inputArgs, method) {
          method.apply(this, inputArgs);
        },
      },
    });
  },
};
