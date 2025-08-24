import { Logger } from 'pino';
import pino from 'pino';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const logDir = join(__dirname, '..', '..', '..', 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const logFilePath = join(logDir, `graphql_shopify.log`);

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
                singleLine: true,
              },
            }
          : {
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
            },
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
