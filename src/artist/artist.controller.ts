import {
  Controller,
  // Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // @Post()
  // create() {
  //   return this.artistService.create();
  // }

  // @Get()
  // findAll() {
  //   return this.artistService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.artistService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string) {
  //   return this.artistService.update(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.artistService.remove(id);
  // }
}
