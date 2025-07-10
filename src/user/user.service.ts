import { hash } from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.schema';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { findAllPaginate, PrismaModel } from 'src/common/utils/pagination.util';

const SALT_ROUNDS = 12;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(newUserDto: CreateUserDTO) {
    const isEmailExists = await this.prisma.user.findUnique({
      where: { email: newUserDto.email },
    });

    if (isEmailExists) {
      throw new BadRequestException(`Email already exists!`);
    }

    const hashedPassword = await hash(newUserDto.password, SALT_ROUNDS);

    const data: Prisma.UserCreateInput = {
      ...newUserDto,
      password: hashedPassword,
    };

    return this.prisma.user.create({ data, omit: { password: true } });
  }

  async findAll(pagination: PaginationParams) {
    const model = this.prisma.user as unknown as PrismaModel<User>;

    const query: Prisma.UserFindManyArgs = {
      orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
      omit: { password: true },
    };

    const config = {
      pagination: pagination,
      model: model,
      query: query,
      afterType: 'id',
    };

    return await findAllPaginate<User>(config);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    await this.findOne(id);

    const {
      playlists: playlistsId = [],
      password,
      ...restOfUserData
    } = updateUserDto;

    const playlists = await this.prisma.playlist.findMany({
      where: { id: { in: playlistsId } },
      select: { id: true },
    });

    const data: Prisma.UserUpdateInput = {
      ...restOfUserData,
    };

    if (playlists) {
      data.playlists = {
        connect: playlists,
      };
    }

    if (password) {
      data.password = await hash(password, SALT_ROUNDS);
    }

    return await this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prisma.user.delete({
      where: { id },
      omit: { password: true },
    });
  }
}
