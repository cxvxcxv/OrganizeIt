import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOne(categoryId: number) {
    return await this.prismaService.category.findUnique({
      where: { id: categoryId },
    });
  }

  async create(userId: number, createCategoryDto: CreateCategoryDto) {
    const category = await this.prismaService.category.findFirst({
      where: {
        userId,
        name: createCategoryDto.name,
      },
    });

    if (category) throw new BadRequestException('category already exists');

    const newCategory = await this.prismaService.category.create({
      data: { name: createCategoryDto.name, user: { connect: { id: userId } } },
    });

    return newCategory;
  }

  async update(
    userId: number,
    categoryId: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.validateCategory(userId, categoryId);

    const data: Partial<Category> = updateCategoryDto;
    console.log(data);

    const category = await this.prismaService.category.update({
      where: { id: categoryId },
      data,
    });

    return category;
  }

  async delete(userId: number, categoryId: number) {
    await this.validateCategory(userId, categoryId);

    await this.prismaService.category.delete({
      where: { id: categoryId },
    });

    return true;
  }

  private async validateCategory(userId: number, categoryId: number) {
    const category = await this.getOne(categoryId);

    if (!category) throw new NotFoundException('category not found');
    if (category.userId !== userId) throw new ForbiddenException('no access');

    return category;
  }
}
