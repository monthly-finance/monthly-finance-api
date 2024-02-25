import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserInputDto,
  LoginUserInputDto,
  UpdateUserInputDto,
} from './dto/input.user.dto';
import {
  CreateUserOutputDto,
  FindOneUserOutputDto,
  UpdateUserOutputDto,
} from './dto/output.user.dto';
import { Public } from 'src/shared/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserInputDto,
  ): Promise<CreateUserOutputDto> {
    const entity = await this.userRepo.create({ ...createUserDto });
    this.userRepo.save(entity);

    return await this.userRepo.findOneBy({ username: createUserDto.username });
  }

  async findOne(id: string): Promise<FindOneUserOutputDto> {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserInputDto,
  ): Promise<UpdateUserOutputDto> {
    await this.userRepo.update(id, updateUserDto);
    return await this.userRepo.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.userRepo.softDelete({ id });
  }

  async findUserByCredentials(
    loginDto: LoginUserInputDto,
  ): Promise<FindOneUserOutputDto> {
    const { username, password } = loginDto;
    const user = await this.userRepo.findOneBy({ username, password });

    if (!user) {
      throw new BadRequestException({}, 'Login failed to find user');
    }

    return user;
  }
}
