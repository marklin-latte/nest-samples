import { Module } from '@nestjs/common';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  exports: [TenancyModule],
})
export class GlobalModule {}
