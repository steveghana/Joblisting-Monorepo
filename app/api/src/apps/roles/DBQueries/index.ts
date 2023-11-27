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

export async function createRoles(
  // roleId: number,
  applicationData: IRole,
  job: JobInfo,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  console.log(applicationData, 'role daa');
  const role = transaction.getRepository(dependencies.db.models.role);
  const jobRepo = transaction.getRepository(dependencies.db.models.jobs);
  const { jobs, ...rest } = applicationData;
  let newApplication = await role.create({
    ...rest,
  });

  let data = await role.save(newApplication);
  const createJob = await jobRepo.create({
    role: data,
    ...job,

    postedDate: new Date(),
  });
  await jobRepo.save(createJob);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
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
    .find({ relations: ['client'] });
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
