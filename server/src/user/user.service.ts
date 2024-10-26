import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import { hash } from 'argon2';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(idOrEmail: number | string) {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [
          { id: typeof idOrEmail === 'number' ? idOrEmail : undefined },
          { email: typeof idOrEmail === 'string' ? idOrEmail : undefined },
        ],
      },
      include: {
        tasks: { orderBy: { deadline: 'desc' } },
        categories: true,
      },
    });
  }

  async create(authUserDto: AuthUserDto) {
    //validation
    const user = await this.getOne(authUserDto.email);
    if (user) throw new BadRequestException('user already exists');

    const hashedPassword = await hash(authUserDto.password);

    const newUser = await this.prismaService.user.create({
      data: {
        email: authUserDto.email,
        password: hashedPassword,
      },
    });

    return newUser;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    await this.validateUserExistence(userId);

    const data: Partial<User> = {};
    if (updateUserDto.username) data.username = updateUserDto.username;
    if (updateUserDto.email) data.email = updateUserDto.email;
    if (updateUserDto.password)
      data.password = await hash(updateUserDto.password);

    const user = await this.prismaService.user.update({
      where: { id: userId },
      data,
    });

    return user;
  }

  async delete(userId: number) {
    await this.validateUserExistence(userId);

    return await this.prismaService.user.delete({ where: { id: userId } });
  }

  private async validateUserExistence(userIdOrEmail: number | string) {
    const user = await this.getOne(userIdOrEmail);
    if (!user) throw new NotFoundException('user not found');
  }
}
