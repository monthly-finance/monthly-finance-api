import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RequestContext } from '../types/auth.type';

export type JwtPayload = {
  sub: string;
  email: string;
};
//Currently this object is not in use. I am using the Monthly Finance's original AuthGuard from src/auth/auth.guard.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    const extractTokenFromHeader = (request) => {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    };
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('AUTH_SECRET'),
      jwtFromRequest: extractTokenFromHeader,
    });
  }

  async validate(payload: RequestContext) {
    const user = await this.userRepo.findOneBy({ id: payload.sub });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
