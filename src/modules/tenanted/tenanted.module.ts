import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { TenantRequiredMiddleware } from './tenant-required.middleware';

/**
 * Tenanted Module 內的 Feature Module 都需要換定 tenant 才能存取
 */
@Module({
  imports: [ArticleModule],
  exports: [ArticleModule],
})
export class TenantedModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantRequiredMiddleware)
      .forRoutes({ path: '/tenanted/*', method: RequestMethod.ALL });
  }
}
