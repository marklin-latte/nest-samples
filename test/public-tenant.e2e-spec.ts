import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import initApp from './bootstraps/init-app';

describe('Tenant (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const result = await initApp(false);
    app = result.app;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Post public/tenants', () => {
    it('should return status code 201', async () => {
      return request(app.getHttpServer())
        .post('/public/tenants')
        .send({ name: 'mark', owner: '2C' })
        .expect(201);
    });
  });
});
