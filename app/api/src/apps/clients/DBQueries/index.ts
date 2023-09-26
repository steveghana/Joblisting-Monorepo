import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import { Client } from '../entities/client.entity';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IClient } from '@/types/client';

export async function createClient(
  // roleId: number,
  clientData: IClient,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const clientRepo = transaction.getRepository(dependencies.db.models.client);
  let newApplication = await clientRepo.create({
    ...clientData,
  });
  let data = await clientRepo.save(newApplication);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}

export function getApplicationById(
  id: number,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return myDataSource.manager
    .getRepository(dependencies.db.models.client)
    .findOne({
      where: { id },
    });
}

export default {
  createClient,
  getApplicationById,
};
