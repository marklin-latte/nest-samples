import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreatorCreateArticleInputDto } from '../dto/creator-create-article-input.dto';
import { CreatorCreateArticleOutputDto } from '../dto/creator-create-article-output.dto';
import { Article } from '../entity/article.entity';
import { CreatorArticleUseCase } from '../usecase/creator-article.usecase';

@ApiTags('articles')
@Controller()
export class ArticleController {
  constructor(private readonly creatorArticleUseCase: CreatorArticleUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: CreatorCreateArticleOutputDto,
  })
  async create(
    @Body() creatorCreateArticleInputDto: CreatorCreateArticleInputDto,
  ): Promise<CreatorCreateArticleOutputDto> {
    const article: Article = await this.creatorArticleUseCase.createArticle(
      creatorCreateArticleInputDto,
    );

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    } as CreatorCreateArticleOutputDto;
  }
}
