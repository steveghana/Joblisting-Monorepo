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

export async function createApplication(
  roleId: number,
  applicationData: IClient,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const applicationRepo = transaction.getRepository(
    dependencies.db.models.client,
  );
  const role = transaction.getRepository(dependencies.db.models.role);
  const exstingrole = await role.findOne({
    where: {
      id: roleId,
    },
    relations: ['client'],
  });
  let newApplication = await applicationRepo.create({
    ...exstingrole,
    ...applicationData,
  });
  let data = await applicationRepo.save(newApplication);
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
  createApplication,
  getApplicationById,
};
