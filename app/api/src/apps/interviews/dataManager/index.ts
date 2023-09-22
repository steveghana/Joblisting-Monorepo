import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { createApplication, getApplicationById } from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { Iinterviews } from '@/types/interviews';

class Interviews {
  dependencies: Dependencies = null;
  data: Iinterviews = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createApplication(
    roleId: number,
    developerId: number,

    application: Iinterviews,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<Interviews> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await createApplication(
      roleId,
      application,
      transaction,
      dependencies,
    );
    return newApplication;
  }

  static async getById(
    id: number,
    dependencies: Dependencies = null,
  ): Promise<Interviews> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await getApplicationById(id, null, dependencies);
    return newApplication;
  }

  get id(): number {
    return this.data.id;
  }

  get email(): string {
    return this.data.email;
  }
  get industry(): string {
    return this.data.industry;
  }
  get name(): string {
    return this.data.name;
  }
  get phone_number(): string {
    return this.data.phone_number;
  }
  get description(): string {
    return this.data.description;
  }
  get role(): Record<any, any> {
    return this.data.role;
  }

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

export default Interviews;
