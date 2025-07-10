import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateUserDTO,
  CreateUserSchema,
  UpdateUserDTO,
  UpdateUserSchema,
} from './dto/user.schema';
import {
  Paginate,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDTO: CreateUserDTO,
  ) {
    return this.userService.create(createUserDTO);
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
