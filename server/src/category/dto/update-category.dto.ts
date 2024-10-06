import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { MAX_CATEGORY_LENGTH } from 'src/constants/category.constants';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_CATEGORY_LENGTH)
  name?: string;
}
