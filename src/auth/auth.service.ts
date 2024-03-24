import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthOutputDto } from './dto/auth.output.dto';
import { LoginAuthInputDto } from './dto/auth.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RequestContext } from './types/auth.type';
import generator from 'generate-password-ts';
import { UserService } from 'src/user/user.service';
import { CreateUserOutputDto } from 'src/user/dto/output.user.dto';
import { OauthUserDto } from './dto/google.user.dto';
import { generateFromEmail } from 'unique-username-generator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginAuthInputDto): Promise<LoginAuthOutputDto> {
    const { username, password } = loginDto;

    const retrievedUser = await this.userRepo.findOneBy({
      username,
      password,
    });

    if (password !== retrievedUser?.password || !retrievedUser) {
      throw new UnauthorizedException();
    }

    const payload: RequestContext = {
      sub: retrievedUser.id,
      username: retrievedUser.username,
      userId: retrievedUser.id,
      email: retrievedUser.email,
      // roles: retrievedUser.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async getUserById(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    delete user.password;
    return user;
  }

  async signInByOauthUserName(user: OauthUserDto) {
    let retrievedUser: CreateUserOutputDto;
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    retrievedUser = await this.getUserByEmail(user.email);

    if (!retrievedUser) {
      retrievedUser = await this.registerUser(user);
    }

    const payload: RequestContext = {
      sub: retrievedUser.id,
      username: retrievedUser.username,
      userId: retrievedUser.id,
      email: retrievedUser.email,
      // roles: retrievedUser.role,
    };

    return await this.jwtService.signAsync(payload);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  async registerUser(user: OauthUserDto): Promise<CreateUserOutputDto> {
    const { email } = user;
    const password = generator.generate({
      length: 15,
      numbers: true,
      symbols: true,
    });

    const username = generateFromEmail(email);
    return await this.userService.create({
      email,
      password,
      username,
    });
  }
}
