import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Currently this object is not in use. I am using the Monthly Finance's original AuthGuard from src/auth/auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
