import { AppModule } from '../../src/app.module';
import * as path from 'path';
import { newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { tenancyMiddleware } from '../../src/modules/global/tenancy/tenancy.middleware';
import { TenantController } from '../../src/modules/public/tenant/controller/tenant.controller';
import { CONNECTION, OWNER } from '../../src/constants/tenancy';

export default async (isOpenTenant = true): Promise<IE2EApp> => {
  const db = newDb();
  const connection: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: [
      path.join(__dirname, '../../src/modules/**/entity', '*.entity.ts'),
    ],
  });
  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  db.public.registerFunction({
    implementation: () => uuidv4(),
    name: 'uuid_generate_v4',
  });
  await connection.initialize();
  await connection.synchronize();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(DataSource)
    .useValue(connection)
    .overrideProvider(CONNECTION)
    .useValue(connection)
    .compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  app.use(tenancyMiddleware);
  await app.init();

  let testTenantId: string;
  if (isOpenTenant) {
    const controller: TenantController =
      app.get<TenantController>(TenantController);
    const testTenant = await controller.create({
      name: 'test',
      owner: OWNER['2C'],
    });
    testTenantId = testTenant.id;
  }

  return { app, testTenantId } as IE2EApp;
};

export declare class IE2EApp {
  app: INestApplication;
  testTenantId: string;
}
