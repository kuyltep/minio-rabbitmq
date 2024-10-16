import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  GetShortUserData,
  UserDataForAuthDto,
} from 'src/user/dto/get.user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/post.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}
  async signIn(userDto: UserDataForAuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.userService.findOneUserForAuth(userDto);
      const isComparePssword = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (!isComparePssword) {
        throw new UnauthorizedException('Error password');
      }
      const payload = {
        sub: user.id,
        username: user.firstName,
        login: user.login,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async registerUser(createUserData: CreateUserDto): Promise<GetShortUserData> {
    try {
      const createdUser = await this.prismaService.user.create({
        data: {
          ...createUserData,
        },
      });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
