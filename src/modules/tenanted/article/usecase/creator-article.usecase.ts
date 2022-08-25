import { Injectable, Logger, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CONNECTION } from '../../../../constants/tenancy';
import { CreatorCreateArticleInputDto } from '../dto/creator-create-article-input.dto';
import { Article } from '../entity/article.entity';

@Injectable()
export class CreatorArticleUseCase {
  logger = new Logger(CreatorArticleUseCase.name);
  private readonly articleRepository: Repository<Article>;

  constructor(@Inject(CONNECTION) connection: DataSource) {
    this.articleRepository = connection.getRepository(Article);
  }

  async createArticle(
    creatorCreateArticleInputDto: CreatorCreateArticleInputDto,
  ): Promise<Article> {
    const article = new Article();
    article.title = creatorCreateArticleInputDto.title;

    const result = await this.articleRepository.save(article);
    return result;
  }
}
