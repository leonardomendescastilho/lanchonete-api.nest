import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(newUser: CreateUsersDto): Promise<Users> {
    const userAlreadExists = await this.usersRepository.findOne({
      where: { email: newUser.email },
    });

    if (userAlreadExists) throw new ConflictException('User already exists');

    const user = this.usersRepository.create(newUser);
    return await this.usersRepository.save(user);
  }
}
