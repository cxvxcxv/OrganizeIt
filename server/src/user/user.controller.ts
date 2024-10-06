import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { Protect } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Protect()
  async getProfile(@CurrentUser('id') userId: number) {
    return await this.userService.getOne(userId);
  }

  @Patch()
  @Protect()
  async updateProfile(
    @CurrentUser('id') userId: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete()
  @Protect()
  async deleteProfile(@CurrentUser('id') userId: number) {
    return await this.userService.delete(userId);
  }
}
