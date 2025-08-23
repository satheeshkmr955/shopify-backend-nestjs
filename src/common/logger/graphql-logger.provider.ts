import { Logger } from 'pino';
import pino from 'pino';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const logDir = join(__dirname, '..', '..', '..', 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const logFilePath = join(
  logDir,
  `graphql_shopify_${new Date().toISOString()}.log`,
);

const dest = pino.destination({
  dest: logFilePath,
  sync: false,
});

export const GraphQLLoggerProvider = {
  provide: 'GraphQLLogger',
  useFactory: (): Logger => {
    return pino(
      {
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
      },
      dest,
    );
  },
};
