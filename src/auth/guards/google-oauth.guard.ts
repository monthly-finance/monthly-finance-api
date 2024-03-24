import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthProvider } from '../dto/google.user.dto';

@Injectable()
export class GoogleOauthGuard extends AuthGuard(OauthProvider.GOOGLE) {}
