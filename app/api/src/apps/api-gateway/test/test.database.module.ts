import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

@Global()
@Module({})
export class TestDatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    return {
      module: TestDatabaseModule,
      imports: [TypeOrmModule.forRoot(options)],
      exports: [TypeOrmModule],
    };
  }
}
