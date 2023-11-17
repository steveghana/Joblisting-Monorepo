import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { createClient, getApplicationById } from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IClient } from '@/types/client';

class Client {
  dependencies: Dependencies = null;
  data: IClient = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createClient(
    // roleId: number,
    application: IClient,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<Client> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Client(dependencies);
    newApplication.data = await createClient(
      // roleId,
      application,
      transaction,
      dependencies,
    );
    return newApplication;
  }

  static async getById(
    id: number,
    dependencies: Dependencies = null,
  ): Promise<Client> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Client(dependencies);
    newApplication.data = await getApplicationById(id, null, dependencies);

    return newApplication;
  }

  get id(): number {
    return this.data.id;
  }

  get email(): string {
    return this.data.email;
  }
  get industry(): string[] {
    return this.data.industry;
  }
  get name(): string {
    return this.data.name;
  }
  get phone_number(): string {
    return this.data.phoneNumber;
  }
  get description(): string {
    return this.data.description;
  }
  // get role(): Record<any, any> {
  //   return this.data.;
  // }

  get exists(): boolean {
    return this.data !== null;
  }

  //   isInactive(): boolean {
  //     return (
  //       !this.data.isActive ||
  //       Date.now() - new Date(this.data.createdAt).getTime() >
  //         this.dependencies.config.authentication.credentialTokenTTL
  //     );
  //   }
}

export default Client;
