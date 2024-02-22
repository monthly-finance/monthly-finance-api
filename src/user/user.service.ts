import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const entity = await this.userRepo.create({ ...createUserDto });
    this.userRepo.save(entity);
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
