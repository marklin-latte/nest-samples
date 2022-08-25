import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import initApp from './bootstraps/init-app';

describe('TenantController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Post /tenants', () => {
    it('should return status code 200', async () => {
      return request(app.getHttpServer())
        .post('/tenants')
        .send({ name: 'mark', owner: '2C' })
        .expect(201);
    });
  });
});
