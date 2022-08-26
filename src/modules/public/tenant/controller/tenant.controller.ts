import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminCreateTenantInputDto } from '../dto/admin-create-tenant-input.dto';
import { Tenant } from '../entity/tenant.entity';
import { AdminTenantUseCase } from '../usecase/admin-tenant.usecase';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AdminCreateTenantOutputDto } from '../dto/admin-create-tenant-output.dto';

@ApiTags('tenants')
@Controller()
export class TenantController {
  constructor(private readonly adminTenantUseCase: AdminTenantUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: AdminCreateTenantOutputDto,
  })
  async create(
    @Body() adminCreateTenantInputDto: AdminCreateTenantInputDto,
  ): Promise<AdminCreateTenantOutputDto> {
    const tenant = await this.adminTenantUseCase.createTenant(
      adminCreateTenantInputDto,
    );
    return {
      id: tenant.id,
      name: tenant.name,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    } as AdminCreateTenantOutputDto;
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.adminTenantUseCase.findAll();
  }
}
