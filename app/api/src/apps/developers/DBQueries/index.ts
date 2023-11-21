import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IDev } from '@/types/developer';

export async function enrollDev(
  applicationData: IDev,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  const { user, ...rest } = applicationData;
  const newUser = await userRepo.create({
    ...user,
  });

  await userRepo.save(newUser);
  let dev = await devRepo.create({
    user: newUser,
    ...rest,
  });
  let devData = await devRepo.save(dev);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return devData as unknown as IDev;
}

export async function getDevById(
  id: number,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const dev = await myDataSource.manager
    .getRepository(dependencies.db.models.developer)
    .findOne({
      where: { id },
    });
  return dev as unknown as IDev;
}

export default {
  enrollDev,
  getDevById,
};
