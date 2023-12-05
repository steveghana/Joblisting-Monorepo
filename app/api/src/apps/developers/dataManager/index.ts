import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  enrollDev,
  getDevById,
  deleteDev,
  updateDev,
  bulkdeleteDevs,
} from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IDev } from '@/types/developer';

class Developers {
  dependencies: Dependencies = null;
  data: IDev = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async enrollDev(
    devData: IDev,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<IDev> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Developers(dependencies);

    newApplication.data = await enrollDev(devData, transaction, dependencies);
    return newApplication.data;
  }
  static async update(
    applicantId: string,
    applicantion: Partial<IDev>,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);
    return await updateDev(
      applicantId,
      applicantion,
      transaction,
      dependencies,
    );
  }
  static async getById(
    id: string,
    dependencies: Dependencies = null,
  ): Promise<IDev> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Developers(dependencies);
    newApplication.data = await getDevById(id, null, dependencies);
    return newApplication.data;
  }
  static async destroy(
    devId: string,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<number> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await deleteDev(devId, transaction, dependencies);
  }
  static async bulkdestroy(
    devId: string[],
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<number> {
    dependencies = injectDependencies(dependencies, ['db']);
    return await bulkdeleteDevs(devId, transaction, dependencies);
  }
  get id(): string {
    return this.data.id;
  }

  get email(): string {
    return this.data.user.email;
  }
  get phone(): string {
    return this.data.phone_number;
  }
  get firstName(): string {
    return this.data.firstName;
  }
  get lastName(): string {
    return this.data.lastName;
  }
  get roleStatus(): string {
    return this.data.role_status;
  }
  get interviewee(): any {
    return this.data.interviewsAsInterviewee;
  }
  get interviewer(): any {
    return this.data.interviewsAsInterviewer;
  }
  get role(): Record<any, any> {
    return this.data.roles;
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

export default Developers;
