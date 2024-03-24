import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthInputDto } from './dto/auth.input.dto';
import { LoginAuthOutputDto } from './dto/auth.output.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFContext, Public } from 'src/shared/types/types';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Get Access token with username and password' })
  signIn(@Body() loginDto: LoginAuthInputDto): Promise<LoginAuthOutputDto> {
    return this.authService.login(loginDto);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get User Info from Access Token' })
  getUser(@MFContext('userId') userId: string): Promise<any> {
    return this.authService.getUserById(userId);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req) {
    const token = await this.authService.signInByOauthUserName(req.user);

    return { access_token: token };
  }
}
