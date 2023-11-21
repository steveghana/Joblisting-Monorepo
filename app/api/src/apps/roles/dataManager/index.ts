import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  createRoles,
  getRoleById,
  deleteRole,
  updateRole,
} from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IClient } from '@/types/client';
import { IRole } from '@/types/role';
import { IApplication } from '@/types/application';

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
  ): Promise<Roles> {
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
  static async destroy(
    roleId: number,
    // tableIds: number[],
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<number> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await deleteRole(roleId, transaction, dependencies);
  }

  static async update(
    roleId: number,
    role: Partial<IRole>,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<any> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await updateRole(roleId, role, transaction, dependencies);
  }
  static async getById(
    id: number,
    dependencies: Dependencies = null,
  ): Promise<Roles> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Roles(dependencies);
    newApplication.data = await getRoleById(id, null, dependencies);
    return newApplication;
  }

  get id(): number {
    return this.data.id;
  }

  get applications(): IApplication[] {
    return this.data.application;
  }
  get client(): IClient {
    return this.data.client;
  }
  get skills(): string[] {
    return this.data.skills_required;
  }
  get title(): string {
    return this.data.title;
  }
  get description(): string {
    return this.data.description;
  }
  get role(): string {
    return this.data.vacancy_status;
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
