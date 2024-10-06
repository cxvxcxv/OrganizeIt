import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Protect()
  async create(
    @CurrentUser('id') userId: number,
    @Body(ValidationPipe) categoryDto: CategoryDto,
  ) {
    return await this.categoryService.create(userId, categoryDto);
  }

  @Put(':categoryId')
  @Protect()
  async update(
    @CurrentUser('id') userId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body(ValidationPipe) categoryDto: CategoryDto,
  ) {
    return await this.categoryService.update(userId, categoryId, categoryDto);
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
