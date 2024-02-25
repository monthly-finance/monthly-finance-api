import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthOutputDto } from './dto/auth.output.dto';
import { LoginAuthInputDto } from './dto/auth.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginAuthInputDto): Promise<LoginAuthOutputDto> {
    const { username, password } = loginDto;

    const retrievedUser = await this.userRepo.findOneBy({
      username,
      password,
    });

    if (password !== retrievedUser.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: retrievedUser.id,
      username: retrievedUser.username,
      userId: retrievedUser.id,
      // role: retrievedUser.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
