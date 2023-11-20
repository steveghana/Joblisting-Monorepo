import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import { Client } from '../entities/client.entity';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IClient } from '../../../types/client';
import { ensureTransaction } from '../../../Config/transaction';
import { ClientFormDataDto } from '../dto/create-client.dto';

export const getAllClients = (
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) => {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return transaction
    .getRepository(dependencies.db.models.client)
    .find({ relations: ['roles'] });
};

export function findElseCreateClient(
  email: string,
  clientInfo: IClient & { communicationPreferences: string },
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<[Client, boolean]> {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return ensureTransaction(
    transactionParam,
    async (transaction) => {
      const clientRepo = transaction.getRepository(
        dependencies.db.models.client,
      );
      const existingClient = (await clientRepo.findOne({
        where: { email: email.toLowerCase() },
      })) as unknown as Client;
      if (existingClient) {
        return [existingClient, false];
      } else {
        const newClient = clientRepo.create({ ...clientInfo });
        const savedClient = await clientRepo.save(newClient);
        console.log(savedClient, 'this is the saved data...........');
        return [savedClient, true];
      }
    },
    dependencies,
  );
}

export function getClientById(
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
      relations: ['roles'],
    });
}
export async function deleteClient(
  id: number,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<number> {
  dependencies = injectDependencies(dependencies, ['db']);
  const roles = transaction.getRepository(dependencies.db.models.role);

  // delete all previous relations between area - table
  await roles.delete({
    client: {
      id,
    },
  });

  const { affected } = await transaction
    .getRepository(dependencies.db.models.client)
    .delete({
      id,
    });
  return affected;
  // delete all  tables
}

export async function updateClient(
  id: number,
  updates: Partial<IClient>,
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const clientRepo = transactionParam.getRepository(
    dependencies.db.models.client,
  );
  return await ensureTransaction(
    transactionParam,
    async (transaction) => {
      const { generatedMaps } = await clientRepo.update({ id }, { ...updates });
      return generatedMaps;
    },
    dependencies,
  );
}
export default {
  getAllClients,
  updateClient,
  deleteClient,
  // createClient,
  getClientById,
  findElseCreateClient,
};
