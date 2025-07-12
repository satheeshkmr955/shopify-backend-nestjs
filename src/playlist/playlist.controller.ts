import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestUser } from 'src/common/types/user.types';

@UseGuards(JwtAuthGuard)
@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePlaylistSchema))
    createPlaylistDTO: CreatePlaylistDTO,
    @Request() req: RequestUser,
  ) {
    const user = req.user;
    return this.playlistService.create(createPlaylistDTO, user);
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
