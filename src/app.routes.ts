import { Routes } from 'nest-router';
import { AppModule } from './app.module';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { ArticleModule } from './modules/tenanted/article/article.module';

export const routers: Routes = [
  {
    path: '/',
    module: AppModule,
    children: [
      {
        path: 'public/tenants',
        module: TenantModule,
      },
      {
        path: 'tenanted/articles',
        module: ArticleModule,
      },
    ],
  },
];
