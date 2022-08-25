import { Test, TestingModule } from '@nestjs/testing';
import { OWNER } from '../../../../constants/tenancy';
import { AdminCreateTenantInputDto } from '../dto/admin-create-tenant-input.dto';
import { AdminTenantUseCase } from '../usecase/admin-tenant.usecase';
import { TenantController } from './tenant.controller';

describe('TenantController', () => {
  let controller: TenantController;
  let useCaseCreateTenantMock: jest.Mock;

  beforeEach(async () => {
    useCaseCreateTenantMock = jest.fn().mockResolvedValue({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: AdminTenantUseCase,
          useValue: {
            createTenant: useCaseCreateTenantMock,
          },
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
  });

  it('should call once createTenant of tenant usecase, and return tenant', async () => {
    // Arrange
    const newTenant: AdminCreateTenantInputDto =
      new AdminCreateTenantInputDto();
    newTenant.name = 'Org1';
    newTenant.owner = OWNER['2C'];
    useCaseCreateTenantMock.mockResolvedValue({
      name: newTenant.name,
    });

    // Act
    const result: any = await controller.create(newTenant);

    // Assert
    expect(result.name).toEqual(newTenant.name);
  });
});
