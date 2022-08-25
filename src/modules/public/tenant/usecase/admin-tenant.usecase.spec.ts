import { AdminTenantUseCase } from './admin-tenant.usecase';
import { Tenant } from '../entity/tenant.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminCreateTenantInputDto } from '../dto/admin-create-tenant-input.dto';
import { TenancyModule } from '../../../global/tenancy/tenancy.module';
import { TenancyUtil } from '../../../global/tenancy/tenancy.utils';

describe('AdminTenantUseCase Test', () => {
  let mockTenant: Tenant;
  let repositorySaveMock: jest.Mock;
  let adminTenantUseCase: AdminTenantUseCase;

  beforeEach(async () => {
    mockTenant = new Tenant();
    mockTenant.name = 'abcdefg';

    repositorySaveMock = jest.fn().mockResolvedValue(mockTenant);
    const module: TestingModule = await Test.createTestingModule({
      imports: [TenancyModule],
      providers: [
        AdminTenantUseCase,
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

    adminTenantUseCase = module.get<AdminTenantUseCase>(AdminTenantUseCase);
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
    const result: Tenant = await adminTenantUseCase.createTenant({
      name: tenant.name,
    } as AdminCreateTenantInputDto);

    // Assert
    expect({
      name: result.name,
    }).toEqual({
      name: tenant.name,
    });
  });
});
