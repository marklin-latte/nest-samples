import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { Tenant } from '../entity/tenant.entity';
import { TenancyUtil } from '../../../global/tenancy/tenancy.utils';

@Injectable()
export class TenantsService {
  logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly tenancyUtil: TenancyUtil,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    this.logger.log(`${tenant.name} has been created !!!`);
    tenant = await this.tenantsRepository.save(tenant);
    await this.tenancyUtil.executeTenantMigration(tenant.id);

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
