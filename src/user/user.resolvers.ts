import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { IDInput, User } from 'src/graphql';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserService } from './user.service';
import { UpdateUserDTO, UpdateUserSchema } from './dto/user.schema';
import { RequestUser } from 'src/common/types/user.types';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
    return await this.userService.update(input.id, input);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('input')
    input: IDInput,
  ) {
    return await this.userService.remove(input.id);
  }
}
