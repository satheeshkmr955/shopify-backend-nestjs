import { Controller, Post, Body } from '@nestjs/common';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateUserDTO, CreateUserSchema } from 'src/user/dto/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO, LoginSchema } from './dto/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDTO: CreateUserDTO,
  ) {
    return this.userService.create(createUserDTO);
  }

  @Post('login')
  async login(@Body(new ZodValidationPipe(LoginSchema)) loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
