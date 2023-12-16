import { Test, TestingModule } from '@nestjs/testing';

import {
  setupTestApp,
  closeTestDatabase,
  setupTestDatabase,
} from '../../../apps/api-gateway/test/test.setup';
import * as supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import Entities from '../../../Config/model';
import { TestAuthModule } from './auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testDatabaseOptions: DataSourceOptions = {
      type: 'sqlite',
      database: ':memory:',
      entities: [...Entities],
      synchronize: true,
      logging: false,
    };

    app = await setupTestApp(testDatabaseOptions, [
      TestAuthModule.forTesting(),
    ]);

    await setupTestDatabase(testDatabaseOptions);
  }, 10000);

  afterAll(async () => {
    await app.close();

    const testDatabaseOptions: DataSourceOptions = {
      type: 'sqlite',
      database: ':memory:',
      entities: [...Entities],
      synchronize: true,
      logging: false,
    };
    await closeTestDatabase(testDatabaseOptions);
  });

  describe('POST /auth/login', () => {
    it('should return a JWT token when valid credentials are provided', () => {
      return supertest(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
        .expect(200)
        .then((response) => {
          // Add assertions based on your application logic and expectations
          expect(response.body).toHaveProperty('token');
        });
    });

    it('should return an error when invalid credentials are provided', () => {
      return supertest(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'invalid@example.com',
          password: 'invalidpassword',
        })
        .expect(401);
    });
  });

  // Add more test cases for other AuthController endpoints (e.g., register, logout)
});
