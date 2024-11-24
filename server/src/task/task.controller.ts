import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:taskId')
  @Protect()
  async get(
    @CurrentUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return await this.taskService.getOne(userId, taskId);
  }

  @Post()
  @Protect()
  async create(
    @CurrentUser('id') userId: number,
    @Body(ValidationPipe) taskDto: TaskDto,
  ) {
    return await this.taskService.create(userId, taskDto);
  }

  @Put(':taskId')
  @Protect()
  async update(
    @CurrentUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(ValidationPipe) taskDto: TaskDto,
  ) {
    return await this.taskService.update(userId, taskId, taskDto);
  }

  @Delete(':taskId')
  @Protect()
  async delete(
    @CurrentUser('id') userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return await this.taskService.delete(userId, taskId);
  }
}
