import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entity/tenant.entity';
import { TenantController } from './controller/tenant.controller';
import { AdminTenantUseCase } from './usecase/admin-tenant.usecase';

/**
 * Tenant 的所有權管理 ( 包含 Tenant 的 CRUD )
 */
@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [AdminTenantUseCase],
  controllers: [TenantController],
})
export class TenantModule {}
