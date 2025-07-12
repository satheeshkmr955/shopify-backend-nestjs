import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UpdateUserDTO, UpdateUserSchema } from './dto/user.schema';
import {
  Paginate,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/types/user.types';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(
    @Request()
    req: RequestUser,
  ) {
    return req.user;
  }

  @Get()
  findAll(@Paginate() pagination: PaginationParams) {
    return this.userService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserSchema)) updateUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(id, updateUserDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
