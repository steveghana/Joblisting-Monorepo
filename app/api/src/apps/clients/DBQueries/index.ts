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
    });
}

export default {
  getAllClients,
  // createClient,
  getClientById,
  findElseCreateClient,
};
