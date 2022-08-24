import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TenancyUtil } from './tenancy.utils';

describe('Tenant Utils Test', () => {
  let dataSourceInitSpy: jest.SpyInstance;
  let tenancyUtil: TenancyUtil;

  beforeEach(async () => {
    dataSourceInitSpy = jest.spyOn(DataSource.prototype, 'initialize');
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenancyUtil],
    }).compile();

    tenancyUtil = module.get<TenancyUtil>(TenancyUtil);
  });

  afterEach(() => {
    dataSourceInitSpy.mockRestore();
  });

  it('should successfully get data source, and called once dataSource initialize', async () => {
    // Arrange
    const tenantId = '001';
    let dataSource: DataSource;

    try {
      // Act
      dataSource = await tenancyUtil.getTenantConnection(tenantId);

      // Assert
      expect(dataSource.isInitialized).toBe(true);
      expect(dataSourceInitSpy).toHaveBeenCalledTimes(1);
    } finally {
      dataSource.destroy();
    }
  });

  it('should successfully get data source, when client called twice', async () => {
    // Arrange
    const tenantId = '002';
    let dataSource: DataSource;
    await tenancyUtil.getTenantConnection(tenantId);
    dataSourceInitSpy.mockReset();

    try {
      // Act
      dataSource = await tenancyUtil.getTenantConnection(tenantId);

      // Assert
      expect(dataSource.isInitialized).toBe(true);
      expect(dataSourceInitSpy).toHaveBeenCalledTimes(0);
    } finally {
      dataSource.destroy();
    }
  });
});
