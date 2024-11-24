import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async getOne(userId: number, taskId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id: taskId, userId: userId },
      include: { category: true },
    });

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  async create(userId: number, taskDto: TaskDto) {
    const { categoryId, deadline, ...data } = taskDto;

    if (categoryId)
      await this.categoryService.validateCategory(userId, categoryId);

    const formattedDeadline = new Date(deadline);
    if (isNaN(formattedDeadline.getTime())) {
      throw new BadRequestException('Invalid date format, expected yyyy-mm-dd');
    }

    const newTask = await this.prismaService.task.create({
      data: {
        ...data,
        deadline: formattedDeadline,
        user: { connect: { id: userId } },
        //connects category if categoryId is defined
        ...(categoryId && {
          category: { connect: { id: categoryId } },
        }),
      },
    });

    return newTask;
  }

  async update(userId: number, taskId: number, taskDto: TaskDto) {
    await this.validateTask(userId, taskId);

    const { categoryId, ...data } = taskDto;

    if (categoryId)
      await this.categoryService.validateCategory(userId, categoryId);

    const formattedDeadline = new Date(taskDto.deadline);
    if (isNaN(formattedDeadline.getTime())) {
      throw new BadRequestException('Invalid date format, expected yyyy-mm-dd');
    }

    const task = await this.prismaService.task.update({
      where: { id: taskId },
      data: {
        ...data,
        deadline: formattedDeadline,
        ...(categoryId && { category: { connect: { id: categoryId } } }),
      },
    });

    return task;
  }

  async delete(userId: number, taskId: number) {
    await this.validateTask(userId, taskId);

    await this.prismaService.task.delete({ where: { id: taskId } });
    return true;
  }

  private async validateTask(userId: number, taskId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id: taskId },
    });

    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new ForbiddenException('no access');

    return task;
  }
}
