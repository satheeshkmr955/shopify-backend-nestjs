import { Logger, TransportTargetOptions } from 'pino';
import pino from 'pino';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { ConfigService } from '@nestjs/config';

const logDir = join(__dirname, '..', '..', '..', 'logs');
if (!existsSync(logDir)) {
  mkdirSync(logDir);
}
const logFilePath = join(logDir, `graphql_shopify.log`);

export const GraphQLLoggerProvider = {
  provide: 'GraphQLLogger',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Logger => {
    const targets: TransportTargetOptions[] = [];
    const nodeEnv = configService.get<string>('NODE_ENV') as string;
    const logLevel = configService.get<string>('LOG_LEVEL') as string;

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

    if (nodeEnv === 'development') {
      targets.push({
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: true,
        },
      });
    }

    return pino({
      level: logLevel,
      transport: {
        targets: targets,
      },
      base: {
        service: 'graphql-api',
        env: nodeEnv,
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
