import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UserUpdateDataDto } from './users.dto';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService { 
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getUser(email: string): Promise<Users> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      if (!user) throw new ConflictException('User not found');

      return user;
    } catch (error) {
      console.error('Error get user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to get user');
    }
  }

  async updateUser(userUpdate: UserUpdateDataDto): Promise<void> {
    try {
      const { _id, ...userUpdateData } = userUpdate;
      const userId = new ObjectId(_id);
      const user = await this.usersRepository.findOne({ where: { _id: userId } });

      if (!user) throw new ConflictException('User not found');

      if (userUpdateData.password) {
        const hashPassword = await bcrypt.hash(userUpdateData.password, 10);
        userUpdateData.password = hashPassword;
      } 

      const updatedUser = await this.usersRepository.update({ _id: userId }, userUpdateData);
      
      if (!updatedUser) throw new ConflictException('Failed to update user');
    } catch (error) {
      console.error('Error get user:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to get user');
    }
  }
  
}
