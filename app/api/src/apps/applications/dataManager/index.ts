import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { createApplication, getApplicationById } from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IApplication, IStatusApplication } from '../../../types/application';

class Application {
  dependencies: Dependencies = null;
  data: IApplication = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createApplication(
    roleId: number,
    application: IApplication,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<Application> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Application(dependencies);
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
  ): Promise<Application> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Application(dependencies);
    newApplication.data = await getApplicationById(id, null, dependencies);
    return newApplication;
  }

  get id(): number {
    return this.data.id;
  }

  get status(): IStatusApplication {
    return this.data.status;
  }

  get experience(): number {
    return this.data.years_of_experience;
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

export default Application;
