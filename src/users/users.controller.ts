import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersDto, UsersDto, UserUpdateDataDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getUser(@Body() userEmail: GetUsersDto): Promise<UsersDto> {
    return this.usersService.getUser(userEmail.email);
  }


  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() userUpdate: UserUpdateDataDto): Promise<void> {
    return this.usersService.updateUser(userUpdate);
  }

}
