import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTenantDto } from '../dto/admin-create-tenant.dto';
import { Tenant } from '../entity/tenant.entity';
import { TenantsService } from '../service/tenants.service';

@Controller()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
