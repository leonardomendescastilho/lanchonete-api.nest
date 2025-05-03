import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { Users } from './users.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(newUser: CreateUsersDto): Promise<Users> {
    try {
      const userAlreadExists = await this.usersRepository.findOne({
        where: { email: newUser.email },
      });

      if (userAlreadExists) throw new ConflictException('User already exists');

      const user = this.usersRepository.create(newUser);

      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error create user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to create user');
    }
  }

  async updateUser(user: UpdateUsersDto): Promise<void> {
    try {
      const userId = new ObjectId(user._id);
      const userExists = await this.usersRepository.findOne({
        where: { _id: userId },
      });

      if (!userExists) throw new ConflictException('User not found');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...updateUserData } = user;

      await this.usersRepository.update(userId, updateUserData);
    } catch (error) {
      console.error('Error updating user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to update user');
    }
  }
}
