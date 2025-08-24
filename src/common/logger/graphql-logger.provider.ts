import { Logger, TransportTargetOptions } from 'pino';
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

    return pino({
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        targets: targets,
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
