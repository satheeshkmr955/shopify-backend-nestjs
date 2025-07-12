import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';

import { SongsService } from './songs.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreateSongSchema,
  CreateSongDTO,
  UpdateSongSchema,
  UpdateSongDTO,
} from './dto/song.schema';
import {
  Paginate,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreateSongSchema)) createSongDTO: CreateSongDTO,
  ) {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(@Paginate() pagination: PaginationParams) {
    return this.songsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateSongSchema)) updateSongDTO: UpdateSongDTO,
  ) {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
