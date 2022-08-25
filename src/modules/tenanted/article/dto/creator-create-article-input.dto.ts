import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatorCreateArticleInputDto {
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
}
