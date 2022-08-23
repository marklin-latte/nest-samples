import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { Tenant } from '../entity/tenant.entity';
import { TenancyUtil } from '../../../global/tenancy/tenancy.utils';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly tenancyUtil: TenancyUtil,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    console.log('1');
    console.log(this.tenantsRepository);
    tenant = await this.tenantsRepository.save(tenant);
    console.log('2');
    await this.tenancyUtil.executeTenantMigration(tenant.id);
    console.log('3');

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }
}
