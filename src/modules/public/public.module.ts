import { Module } from '@nestjs/common';
import { TenantModule } from './tenants/tenant.module';

@Module({
  imports: [TenantModule],
  exports: [TenantModule],
})
export class PublicModule {}
