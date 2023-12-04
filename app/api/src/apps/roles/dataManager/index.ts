import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  createRoles,
  getRoleById,
  deleteRole,
  updateRole,
  createJobs,
} from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IClient } from '@/types/client';
import { IRole } from '@/types/role';
import { IApplication } from '@/types/application';
import { JobInfo } from '../dto/create-role.dto';

class Roles {
  dependencies: Dependencies = null;
  data: IRole = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createRoles(
    // roleId: number,
    application: IRole,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Roles(dependencies);
    newApplication.data = await createRoles(
      // roleId,
      application,
      transaction,
      dependencies,
    );
    return newApplication;
  }
  static async createJobs(
    roleId: string,
    jobinfo: JobInfo,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Roles(dependencies);
    newApplication.data = await createJobs(
      roleId,
      jobinfo,
      transaction,
      dependencies,
    );
    return newApplication;
  }
  static async destroy(
    roleId: string,
    // tableIds: number[],
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<number> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await deleteRole(roleId, transaction, dependencies);
  }

  static async update(
    roleId: string,
    role: Partial<IRole>,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<any> {
    dependencies = injectDependencies(dependencies, ['db']);

    return await updateRole(roleId, role, transaction, dependencies);
  }
  static async getById(id: string, dependencies: Dependencies = null) {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Roles(dependencies);
    newApplication.data = await getRoleById(id, null, dependencies);
    return newApplication.data;
  }

  get id(): string {
    return this.data.id;
  }

  get applications(): IApplication[] {
    return this.data.application;
  }
  get developersNeed(): string {
    return this.data.devsNeeded;
  }
  get client(): IClient {
    return this.data.client;
  }
  get title(): string {
    return this.data.title;
  }
  get experience(): string {
    return this.data.experience;
  }
  get aboutTheProject(): string {
    return this.data.aboutTheProject;
  }
  get Jobs(): JobInfo[] {
    return this.data.jobs;
  }
  // get roleStatus(): string {
  //   return this.data.vacancy_status;
  // }
  get createdAt(): Date {
    return this.data.createdAt;
  }
  get updateAt(): Date {
    return this.data.updateAt;
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

export default Roles;
