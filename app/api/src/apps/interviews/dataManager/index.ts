import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  scheduleInterview,
  getInterviewById,
  cancelInterview,
} from '../DBQueries/index';
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
    interviewData: Omit<Iinterviews, 'interviewer' | 'interviewee' | 'role'> & {
      candidateId: string;
      interviewerId: string;
    },
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await scheduleInterview(
      interviewData,
      transaction,
      dependencies,
    );
    return newApplication.data;
  }

  static async getById(id: string, dependencies: Dependencies = null) {
    dependencies = injectDependencies(dependencies, ['db']);
    const newApplication = new Interviews(dependencies);
    newApplication.data = await getInterviewById(id, null, dependencies);
    return newApplication.data;
  }
  static async cancleInterview(
    interviewId: string,
    transaction: EntityManager = null,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db']);
    const canceld = await cancelInterview(
      interviewId,
      transaction,
      dependencies,
    );
    return canceld;
  }

  get id(): string {
    return this.data.id;
  }

  get status(): string {
    return this.data.status;
  }
  get candidate(): IDev {
    return this.data.candidate;
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
