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
  let data = await userRepo.save(newUser);
  let dev = await devRepo.create({
    ...rest,
    user,
  });
  let devData = await devRepo.save(dev);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return devData;
}

export function getDevById(
  id: number,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return myDataSource.manager
    .getRepository(dependencies.db.models.developer)
    .findOne({
      where: { id },
    });
}

export default {
  enrollDev,
  getDevById,
};
