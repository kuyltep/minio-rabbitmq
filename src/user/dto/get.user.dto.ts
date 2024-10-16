import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserDataForAuthDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 6 })
  @ApiProperty({ type: String })
  password: string;
}

export class GetShortUserData {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  firstName: string;
  @ApiProperty({ type: String })
  lastName: string;
  @ApiProperty({ type: String })
  login: string;
  @ApiProperty({ type: String })
  password: string;
}
