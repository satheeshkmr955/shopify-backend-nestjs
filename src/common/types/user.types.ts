import type { Request } from '@nestjs/common';
import { User } from '@prisma/client';

export interface RequestUser extends Request {
  user: User;
}

export type UserWithArtistID = User & {
  artistId?: string;
};
