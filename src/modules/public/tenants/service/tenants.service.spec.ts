import { TenantsService } from './tenants.service';
import { Tenant } from '../entity/tenant.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTenantInputDto } from '../dto/create-tenant-input.dto';
import { TenancyModule } from '../../../global/tenancy/tenancy.module';
import { TenancyUtil } from '../../../global/tenancy/tenancy.utils';

describe('Tenant Utils Test', () => {
  let mockTenant: Tenant;
  let repositorySaveMock: jest.Mock;
  let service: TenantsService;

  beforeEach(async () => {
    mockTenant = new Tenant();
    mockTenant.name = 'abcdefg';

    repositorySaveMock = jest.fn().mockResolvedValue(mockTenant);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TenancyModule],
      providers: [
        TenantsService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: {
            save: repositorySaveMock,
          },
        },
        {
          provide: TenancyUtil,
          useValue: {
            executeTenantMigration: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
  });

  afterEach(() => {
    repositorySaveMock.mockRestore();
  });

  it('should successfully create a new tenant', async () => {
    // Arrange
    const tenant: Tenant = new Tenant();
    tenant.name = 'mark_tenant';

    repositorySaveMock.mockResolvedValue(tenant);

    // Act
    const result: Tenant = await service.create({
      name: tenant.name,
    } as CreateTenantInputDto);

    // Assert
    expect({
      name: result.name,
    }).toEqual({
      name: tenant.name,
    });
  });
});
