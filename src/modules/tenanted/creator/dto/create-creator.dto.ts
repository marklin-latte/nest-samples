import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateCreatorDto {
  @ApiProperty({
    description: '帳號',
  })
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: '密碼',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'email (不支援 yahoo)',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '18 歲以上，不可以色色',
    minimum: 18,
  })
  @Min(18)
  @IsNumber()
  @IsOptional()
  age: number;
}
