import { Module } from '@nestjs/common';
import { TenantModule } from './tenant/tenant.module';

/**
 * Public Module 裡的 feature Module
 * 代表不需要透過指定 tenant 來存取
 */
@Module({
  imports: [TenantModule],
  exports: [TenantModule],
})
export class PublicModule {}
