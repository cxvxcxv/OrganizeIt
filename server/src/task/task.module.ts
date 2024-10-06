import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule, CategoryModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
