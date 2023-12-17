import { DynamicModule, INestApplication, NestModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConnectionOptions,
  DataSourceOptions,
  createConnection,
} from 'typeorm';
import { TestDatabaseModule } from './test.database.module';

export async function setupTestApp(
  testDatabaseOptions: DataSourceOptions,
  modules: DynamicModule[],
): Promise<INestApplication> {
  const testingModuleBuilder: TestingModule = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(testDatabaseOptions), ...modules],
  }).compile();

  const app = testingModuleBuilder.createNestApplication();
  await app.init();

  return app;
}

export async function setupTestDatabase(
  options: ConnectionOptions,
): Promise<void> {
  const connection = await createConnection(options);
  await connection.runMigrations();
}

export async function closeTestDatabase(
  options: ConnectionOptions,
): Promise<void> {
  const connection = await createConnection(options);
  await connection.close();
}
