import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IRole } from '../../../types/role';
import { ensureTransaction } from '../../../Config/transaction';
import { JobInfo } from '../dto/create-role.dto';
import { HttpExceptionFilter } from '@/middleware/err.Middleware';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function createRoles(
  applicationData: IRole,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const role = transaction.getRepository(dependencies.db.models.role);
  const { jobs, ...rest } = applicationData;
  let newApplication = await role.create({
    ...rest,
  });
  let data = await role.save(newApplication);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}
export async function createJobs(
  roleId: string,
  job: JobInfo,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const role = transaction.getRepository(dependencies.db.models.role);
  const jobRepo = transaction.getRepository(dependencies.db.models.jobs);
  const roleForJob = await role.findOne({ where: { id: roleId } });

  const createJob = await jobRepo.create({
    role: roleForJob,
    ...job,
    postedDate: new Date(),
  });
  const data = await jobRepo.save(createJob);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return roleForJob;
}
export function getRoleById(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return myDataSource.manager
    .getRepository(dependencies.db.models.role)
    .findOne({
      where: { id },
      relations: ['client', 'application', 'interviews', 'developers', 'jobs'],
    });
}
export async function deleteRole(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<number> {
  dependencies = injectDependencies(dependencies, ['db']);
  const jobRepo = transaction.getRepository(dependencies.db.models.jobs);
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const applicantionRep = transaction.getRepository(
    dependencies.db.models.application,
  );
  const interviewRepo = transaction.getRepository(
    dependencies.db.models.interviews,
  );
  const hoursRepo = transaction.getRepository(
    dependencies.db.models.clockedHours,
  );
  const { affected: hoursDeleted } = await hoursRepo.delete({
    role: { id },
  });

  const { affected: interviewDeleted } = await interviewRepo.delete({
    role: { id },
  });

  const { affected: applicationDeleted } = await applicantionRep.delete({
    role: { id },
  });

  const { affected: devDeleted } = await devRepo.delete({ roles: { id } });

  const { affected: jobDeleted } = await jobRepo.delete({ role: { id } });

  const { affected } = await transaction
    .getRepository(dependencies.db.models.role)
    .delete({
      id,
    });
  return affected;
  // delete all  tables
}
export const getAllRoles = (
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) => {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return transaction
    .getRepository(dependencies.db.models.role)
    .find({ relations: ['client', 'jobs'] });
};
export async function updateRole(
  id: string,
  updates: Partial<Omit<IRole, 'jobs'>>,
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const RoleRepo = transactionParam.getRepository(dependencies.db.models.role);
  return await ensureTransaction(
    transactionParam,
    async (transaction) => {
      const data = await RoleRepo.update({ id }, { ...updates });
      return data;
    },
    dependencies,
  );
}

export default {
  createRoles,
  getRoleById,
};
