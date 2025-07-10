import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { PlaylistService } from './playlist.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import {
  CreatePlaylistSchema,
  CreatePlaylistDTO,
  UpdatePlaylistSchema,
  UpdatePlaylistDTO,
} from './dto/playlist.schema';
import {
  Paginate,
  PaginationParams,
} from 'src/common/decorators/pagination.decorator';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePlaylistSchema))
    createPlaylistDTO: CreatePlaylistDTO,
  ) {
    return this.playlistService.create(createPlaylistDTO);
  }

  @Get()
  findAll(@Paginate() pagination: PaginationParams) {
    return this.playlistService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdatePlaylistSchema))
    updatePlaylistDTO: UpdatePlaylistDTO,
  ) {
    return this.playlistService.update(id, updatePlaylistDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(id);
  }
}
