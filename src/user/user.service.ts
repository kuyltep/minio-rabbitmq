import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDataForAuthDto } from './dto/get.user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findOneUserForAuth(userDto: UserDataForAuthDto) {
    try {
      const data = await this.prismaService.user.findFirst({
        where: {
          login: userDto.login,
        },
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
