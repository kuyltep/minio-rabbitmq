import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  login: string;
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({ required: true })
  @IsStrongPassword({ minLength: 6 })
  @IsNotEmpty()
  password: string;
}
