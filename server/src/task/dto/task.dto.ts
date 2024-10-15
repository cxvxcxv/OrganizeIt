import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  PRIORITIES,
} from 'src/constants/task.constants';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_TITLE_LENGTH)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(MAX_DESCRIPTION_LENGTH)
  description?: string;

  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Invalid date format, expected yyyy-mm-dd',
  })
  deadline: string;

  @IsString()
  @IsIn(PRIORITIES)
  priority: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
