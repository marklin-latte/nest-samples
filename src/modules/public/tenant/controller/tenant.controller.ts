import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminCreateTenantInputDto } from '../dto/admin-create-tenant-input.dto';
import { Tenant } from '../entity/tenant.entity';
import { AdminTenantUseCase } from '../usecase/admin-tenant.usecase';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller()
export class TenantController {
  constructor(private readonly adminTenantUseCase: AdminTenantUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: Tenant,
  })
  create(
    @Body() adminCreateTenantInputDto: AdminCreateTenantInputDto,
  ): Promise<Tenant> {
    return this.adminTenantUseCase.createTenant(adminCreateTenantInputDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.adminTenantUseCase.findAll();
  }
}
