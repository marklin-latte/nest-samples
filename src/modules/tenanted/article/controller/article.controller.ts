import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreatorCreateArticleInputDto } from '../dto/creator-create-article-input.dto';
import { Article } from '../entity/article.entity';
import { CreatorArticleUseCase } from '../usecase/creator-article.usecase';

@ApiTags('articles')
@Controller()
export class ArticleController {
  constructor(private readonly creatorArticleUseCase: CreatorArticleUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: Article,
  })
  create(
    @Body() creatorCreateArticleInputDto: CreatorCreateArticleInputDto,
  ): Promise<Article> {
    return this.creatorArticleUseCase.createArticle(
      creatorCreateArticleInputDto,
    );
  }
}
