import { Body, Controller, Post } from '@nestjs/common';
import {
  GetShortUserData,
  UserDataForAuthDto,
} from 'src/user/dto/get.user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/post.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/sign')
  async signIn(
    @Body() userData: UserDataForAuthDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(userData);
  }

  @Post('/register')
  async register(
    @Body() createUserData: CreateUserDto,
  ): Promise<GetShortUserData> {
    return this.authService.registerUser(createUserData);
  }
}
