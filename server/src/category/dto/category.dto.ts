import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_CATEGORY_LENGTH } from 'src/constants/category.constants';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_CATEGORY_LENGTH)
  name: string;
}
