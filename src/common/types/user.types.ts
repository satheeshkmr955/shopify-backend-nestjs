import type { Request } from '@nestjs/common';
import { User } from '@prisma/client';

export interface RequestUser extends Request {
  user: User;
}
