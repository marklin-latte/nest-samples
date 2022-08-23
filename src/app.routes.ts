import { Routes } from 'nest-router';
import { AppModule } from './app.module';
import { TenantModule } from './modules/public/tenants/tenant.module';

export const routers: Routes = [
  {
    path: '/',
    module: AppModule,
    children: [
      {
        path: '/tenants',
        module: TenantModule,
      },
    ],
  },
];
