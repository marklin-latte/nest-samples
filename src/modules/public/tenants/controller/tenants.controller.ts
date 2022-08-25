import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTenantInputDto } from '../dto/create-tenant-input.dto';
import { Tenant } from '../entity/tenant.entity';
import { TenantsService } from '../service/tenants.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('tenants')
@Controller()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Tenant,
  })
  create(@Body() createTenantInputDto: CreateTenantInputDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantInputDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
