import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { CreatorModule } from './creator/creator.module';

@Module({
  imports: [ArticleModule, CreatorModule],
  exports: [ArticleModule, CreatorModule],
})
export class TenantedModule {}
