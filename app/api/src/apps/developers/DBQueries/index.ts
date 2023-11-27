import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IDev } from '@/types/developer';
import { ensureTransaction } from '../../../Config/transaction';

export async function enrollDev(
  devDataset: IDev,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  const { user, ...rest } = devDataset;
  const newUser = await userRepo.create({
    ...user,
    role: 'Developer',
  });

  await userRepo.save(newUser);
  let dev = await devRepo.create({
    ...rest,
    user: newUser,
  });
  let devData = await devRepo.save(dev);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return devData as unknown as IDev;
}
export const getAllDevs = async (
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) => {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return await transaction
    .getRepository(dependencies.db.models.developer)
    .find({ relations: ['roles'] });
};
export async function getDevById(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const dev = await myDataSource.manager
    .getRepository(dependencies.db.models.developer)
    .findOne({
      where: { id },
      relations: ['clockHours', 'roles'],
    });
  return dev as unknown as IDev;
}
export async function updateDev(
  id: string,
  updates: Partial<IDev>,
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const applicationRepo = transactionParam.getRepository(
    dependencies.db.models.developer,
  );
  return await ensureTransaction(
    transactionParam,
    async (transaction) => {
      const data = await applicationRepo.update({ id }, { ...updates });
      return data;
    },
    dependencies,
  );
}
export async function deleteDev(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<number> {
  dependencies = injectDependencies(dependencies, ['db']);
  const rolesRepo = transaction.getRepository(dependencies.db.models.developer);

  const { affected } = await rolesRepo.delete({
    id,
  });
  return affected;
}

export default {
  enrollDev,
  deleteDev,
  getAllDevs,
  updateDev,
  getDevById,
};
