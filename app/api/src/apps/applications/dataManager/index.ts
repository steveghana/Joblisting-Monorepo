import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  createApplication,
  deleteApplicant,
  getApplicationByEmail,
  getApplicationById,
  updateApplication,
} from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IApplication, IStatusApplication } from '../../../types/application';
import { IRole } from '@/types/role';

class Application {
  dependencies: Dependencies = null;
  data: IApplication = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createApplication(
    role: IRole,
    application: IApplication,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<IApplication> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Application(dependencies);
    newApplication.data = await createApplication(
      role,
      application,
      transaction,
      dependencies,
    );
    return newApplication.data;
  }
  static async destroy(
    roleId: number,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<number> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await deleteApplicant(roleId, transaction, dependencies);
  }
  static async getById(
    id: number,
    dependencies: Dependencies = null,
  ): Promise<IApplication> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Application(dependencies);
    newApplication.data = await getApplicationById(id, null, dependencies);
    return newApplication.data;
  }
  static async getByEmail(
    email: string,
    dependencies: Dependencies = null,
  ): Promise<IApplication> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Application(dependencies);
    newApplication.data = await getApplicationByEmail(
      email,
      null,
      dependencies,
    );
    return newApplication.data;
  }
  static async update(
    applicantId: number,
    applicantion: Partial<IApplication>,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<any> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await updateApplication(
      applicantId,
      applicantion,
      transaction,
      dependencies,
    );
  }

  get id(): number {
    return this.data.id;
  }

  get status(): IStatusApplication {
    return this.data.status;
  }

  get experience(): string {
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
