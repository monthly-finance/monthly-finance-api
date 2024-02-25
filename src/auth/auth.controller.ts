import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthInputDto } from './dto/auth.input.dto';
import { LoginAuthOutputDto } from './dto/auth.output.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/types/types';

@Controller('auth')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Get Access token with username and password' })
  signIn(@Body() loginDto: LoginAuthInputDto): Promise<LoginAuthOutputDto> {
    return this.authService.login(loginDto);
  }
}
