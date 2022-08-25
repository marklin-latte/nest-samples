import { Module } from '@nestjs/common';
import { TenancyModule } from './tenancy/tenancy.module';

/**
 * Global Module 裡的 feature Module
 * 代表所有的 Module 都可以使用，並且都帶有 @Global
 */
@Module({
  imports: [TenancyModule],
  exports: [TenancyModule],
})
export class GlobalModule {}
