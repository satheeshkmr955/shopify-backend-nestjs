import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Enable2FAType, User, ValidateType } from 'src/graphql';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO, CreateUserSchema } from 'src/user/dto/user.schema';
import {
  LoginDTO,
  LoginSchema,
  ValidateDTO,
  ValidateSchema,
} from './dto/auth.schema';
import { RequestUser } from 'src/common/types/user.types';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => User)
  async signup(
    @Args('input', new ZodValidationPipe(CreateUserSchema))
    input: CreateUserDTO,
  ) {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async login(
    @Args('input', new ZodValidationPipe(LoginSchema))
    input: LoginDTO,
  ) {
    return await this.authService.login(input);
  }

  @Mutation(() => Enable2FAType)
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Context() context: { req: RequestUser; res: Response }) {
    return await this.authService.enable2FA(context?.req?.user?.id);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async disable2FA(@Context() context: { req: RequestUser; res: Response }) {
    return await this.authService.disable2FA(context?.req?.user?.id);
  }

  @Mutation(() => ValidateType)
  @UseGuards(JwtAuthGuard)
  async validate2FA(
    @Args('input', new ZodValidationPipe(ValidateSchema))
    input: ValidateDTO,
    @Context() context: { req: RequestUser; res: Response },
  ) {
    return await this.authService.validate2FAToken(
      context?.req?.user?.id,
      input.token,
    );
  }
}
