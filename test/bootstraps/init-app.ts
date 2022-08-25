import { AppModule } from '../../src/app.module';
import * as path from 'path';
import { newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

export default async (): Promise<INestApplication> => {
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
    .compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();
  return app;
};
