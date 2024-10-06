import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Protect()
  async create(
    @CurrentUser('id') userId: number,
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.create(userId, createCategoryDto);
  }

  @Patch(':categoryId')
  @Protect()
  async update(
    @CurrentUser('id') userId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(
      userId,
      categoryId,
      updateCategoryDto,
    );
  }

  @Delete(':categoryId')
  @Protect()
  async delete(
    @CurrentUser('id') userId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.delete(userId, categoryId);
  }
}
