import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from 'src/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { ArtistService } from 'src/artist/artist.service';
import { JWTStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolvers';
import { PubSubModule } from 'src/pubSub/PubSub.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PubSubModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JWTStrategy,
    ArtistService,
    AuthResolver,
  ],
})
export class AuthModule {}
