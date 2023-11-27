import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { scheduleInterview, getApplicationById } from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { Iinterviews } from '@/types/interviews';
import { IDev } from '@/types/developer';

class Interviews {
  dependencies: Dependencies = null;
  data: Iinterviews = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async createInterviews(
    roleId: string,
    // developerId: number,

    application: Iinterviews,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ): Promise<Interviews> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await scheduleInterview(
      roleId,
      application,
      transaction,
      dependencies,
    );
    return newApplication;
  }

  static async getById(
    id: string,
    dependencies: Dependencies = null,
  ): Promise<Interviews> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await getApplicationById(id, null, dependencies);
    return newApplication;
  }

  get id(): string {
    return this.data.id;
  }

  get status(): string {
    return this.data.status;
  }
  get interviewee(): IDev {
    return this.data.interviewee;
  }
  get interviewer(): IDev {
    return this.data.interviewer;
  }
  get date(): Date {
    return this.data.scheduled_date;
  }

  get role(): Record<any, any> {
    return this.data.role;
  }
  get createdAt(): Date {
    return this.data.createdAt;
  }
  get updatedAt(): Date {
    return this.data.updatedAt;
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
