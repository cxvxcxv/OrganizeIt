import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(categoryId: number) {
    return await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
  }

  async create(userId: number, categoryDto: CategoryDto) {
    const category = await this.prismaService.category.findFirst({
      where: {
        userId,
        name: categoryDto.name.trim(),
      },
    });

    if (category) throw new BadRequestException('category already exists');

    const newCategory = await this.prismaService.category.create({
      data: {
        name: categoryDto.name.trim(),
        user: { connect: { id: userId } },
      },
    });

    return newCategory;
  }

  async update(userId: number, categoryId: number, categoryDto: CategoryDto) {
    await this.validateCategory(userId, categoryId);

    const category = await this.prismaService.category.findFirst({
      where: {
        userId,
        name: categoryDto.name.trim(),
      },
    });

    if (category) throw new BadRequestException('category already exists');

    const updatedCategory = await this.prismaService.category.update({
      where: { id: categoryId },
      data: categoryDto,
    });

    return updatedCategory;
  }

  async delete(userId: number, categoryId: number) {
    await this.validateCategory(userId, categoryId);

    await this.prismaService.category.delete({
      where: { id: categoryId },
    });

    return true;
  }

  async validateCategory(userId: number, categoryId: number) {
    const category = await this.getOne(categoryId);

    if (!category) throw new NotFoundException('category not found');
    if (category.userId !== userId) throw new ForbiddenException('no access');

    return category;
  }
}
