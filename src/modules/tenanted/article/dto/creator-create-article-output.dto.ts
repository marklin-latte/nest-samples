import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatorCreateArticleOutputDto {
  @ApiProperty({
    description: '文章id',
    example: 'ab6c6581-f0bc-4b9b-83fe-f138e73a945f',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: '文章表題',
    example: 'Mark shared How to say hello for something !',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: '文章內容',
    example: 'Hello',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: '文章建立時間',
    example: new Date(),
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    description: '文章更新時間',
    example: new Date(),
  })
  @IsNotEmpty()
  updatedAt: Date;
}
