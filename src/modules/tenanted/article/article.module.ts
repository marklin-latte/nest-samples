import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './controller/article.controller';
import { Article } from './entity/article.entity';
import { CreatorArticleUseCase } from './usecase/creator-article.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [CreatorArticleUseCase],
  controllers: [ArticleController],
})
export class ArticleModule {}
