import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './users.dto';
import { Users } from './users.entity';

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
    console.log(user);
    return await this.usersRepository.save(user);
  }
}
