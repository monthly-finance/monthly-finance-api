import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    return new User();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(id: string) {
    return `This action removes a #${id} user`;
  }
}
