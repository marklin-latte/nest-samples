// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
// import * as path from 'path';
// import { DataType, newDb } from 'pg-mem';
// import { DataSource } from 'typeorm';

// describe('TenantController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     const db = newDb();
//     const connection = (await db.adapters.createTypeormDataSource({
//       type: 'postgres',
//       entities: [path.join(__dirname, '/modules/**/**/entity', '*.entity.js')],
//       synchronize: true,
//     })) as DataSource;

//     // const moduleFixture: TestingModule = await Test.createTestingModule({
//     //   imports: [AppModule],
//     // })
//     //   .overrideProvider()
//     //   .useValue(connection)
//     //   .compile();

//     // app = moduleFixture.createNestApplication();
//     // await app.init();
//   });

//   afterAll(async () => {
//     await Promise.all([app.close()]);
//   });

//   describe('Post /tenants', () => {
//     it('should return status code 200', async () => {
//       return request(app.getHttpServer())
//         .post('/tenants')
//         .send({ name: 'mark' })
//         .expect(200)
//         .expect('');
//     });
//   });
// });
