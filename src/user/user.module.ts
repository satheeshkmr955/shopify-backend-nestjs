import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma.module';
import { UserResolver } from './user.resolvers';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
