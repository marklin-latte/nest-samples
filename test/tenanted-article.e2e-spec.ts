import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import initApp, { IE2EApp } from './bootstraps/init-app';

describe('Tenanted Article (e2e)', () => {
  let app: INestApplication;
  let testTenantId: string;

  beforeAll(async () => {
    const result: IE2EApp = await initApp();
    app = result.app;
    testTenantId = result.testTenantId;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Post /tenanted/articles', () => {
    it('should return status code 201', async () => {
      return request(app.getHttpServer())
        .post('/tenanted/articles')
        .set('x-tenant-id', testTenantId)
        .send({ title: 'mark', content: 'yaya' })
        .expect(201);
    });

    it('should get 400 error, when require not include x-tenant-id header', () => {
      return request(app.getHttpServer())
        .post('/tenanted/articles')
        .send({ title: 'mark', content: 'yaya' })
        .expect(400);
    });
  });
});
