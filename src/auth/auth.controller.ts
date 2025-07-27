import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { CreateUserDTO, CreateUserSchema } from 'src/user/dto/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import {
  LoginDTO,
  LoginSchema,
  ValidateDTO,
  ValidateSchema,
} from './dto/auth.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Enable2FAType } from 'src/common/types/auth.types';
import { RequestUser } from 'src/common/types/user.types';

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

  @Post('enable-2fa')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  enable2FA(
    @Request()
    req: RequestUser,
  ): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.id);
  }

  @Post('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(
    @Request()
    req: RequestUser,
  ) {
    return this.authService.disable2FA(req.user.id);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  validate2FA(
    @Request()
    req: RequestUser,
    @Body(new ZodValidationPipe(ValidateSchema)) validateDTO: ValidateDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(req.user.id, validateDTO.token);
  }
}
