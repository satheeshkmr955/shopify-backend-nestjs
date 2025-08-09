import type { Request } from '@nestjs/common';
import { User } from '@prisma/client';

export interface RequestUser extends Request {
  user: User;
}

export type UserWithArtistID = User & {
  artistId?: string;
};

export type UserWithoutPassword = Omit<User, 'password'>;

export interface GetUserById {
  getUserById: UserWithoutPassword;
}
