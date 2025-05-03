import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() newUser: CreateUsersDto): Promise<Users> {
    return await this.usersService.createUser(newUser);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() user: UpdateUsersDto): Promise<void> {
    return await this.usersService.updateUser(user);
  }
}
