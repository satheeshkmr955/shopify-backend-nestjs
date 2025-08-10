import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IDInput, User } from 'src/graphql';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserService } from './user.service';
import { UpdateUserDTO, UpdateUserSchema } from './dto/user.schema';
import { RedisPubSubService } from 'src/redisPubSub/redisPubSub.service';
import { USER_DELETED, USER_UPDATED } from 'src/constants/events.constant';

import { RequestUser } from 'src/common/types/user.types';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly redisPubSubService: RedisPubSubService,
  ) {}

  @Query('profile')
  getProfile(@Context() context: { req: RequestUser; res: Response }) {
    const req = context.req;
    return req.user;
  }

  @Query('users')
  async getUsers(@Args('input') pagination: PaginationParams) {
    return await this.userService.findAll(pagination);
  }

  @Query('user')
  async getUser(@Args('input') input: IDInput) {
    return await this.userService.findOne(input.id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input', new ZodValidationPipe(UpdateUserSchema))
    input: UpdateUserDTO,
  ) {
    const userUpdated = await this.userService.update(input.id, input);
    this.redisPubSubService.pubSub.publish(USER_UPDATED, { userUpdated });
    return userUpdated;
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('input')
    input: IDInput,
  ) {
    const userDeleted = await this.userService.remove(input.id);
    this.redisPubSubService.pubSub.publish(USER_DELETED, { userDeleted });
    return userDeleted;
  }

  @Subscription(() => User)
  userUpdated() {
    return this.redisPubSubService.pubSub.subscribe(USER_UPDATED);
  }

  @Subscription(() => User)
  userDeleted() {
    return this.redisPubSubService.pubSub.subscribe(USER_DELETED);
  }
}
