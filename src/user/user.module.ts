import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma.module';
import { UserResolver } from './user.resolvers';
import { PubSubModule } from 'src/pubSub/PubSub.module';

@Module({
  imports: [PrismaModule, PubSubModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
