import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthInputDto } from './dto/auth.input.dto';
import { LoginAuthOutputDto } from './dto/auth.output.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MFContext, Public } from 'src/shared/types/types';

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
    return this.authService.getUser(userId);
  }
}
