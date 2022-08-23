import { TenantsService } from './tenants.service';
import { Tenant } from '../entity/tenant.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { TenancyModule } from '../../../global/tenancy/tenancy.module';

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
    } as CreateTenantDto);

    // Assert
    expect({
      name: result.name,
    }).toEqual({
      name: tenant.name,
    });
  });
});
