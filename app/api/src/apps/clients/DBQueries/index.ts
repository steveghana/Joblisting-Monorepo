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
import { HttpException, HttpStatus } from '@nestjs/common';

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
        const newClient = clientRepo.create({
          ...clientInfo,
        });
        const savedClient = await clientRepo.save(newClient);
        console.log(savedClient, 'this is the saved data...........');
        return [savedClient, true];
      }
    },
    dependencies,
  );
}

export function getClientById(
  id: string,
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
  id: string,
  roleIds: string[],
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<number> {
  dependencies = injectDependencies(dependencies, ['db']);

  const roles = transaction.getRepository(dependencies.db.models.role);
  const job = transaction.getRepository(dependencies.db.models.jobs);
  const applicant = transaction.getRepository(
    dependencies.db.models.application,
  );
  const developer = transaction.getRepository(dependencies.db.models.developer);
  const interview = transaction.getRepository(
    dependencies.db.models.interviews,
  );
  const clock_hours = transaction.getRepository(
    dependencies.db.models.clockedHours,
  );

  // Check if there are roleIds provided, throw an exception if not
  if (!roleIds.length) {
    throw new HttpException(
      'No role IDs provided. Unable to delete client.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Delete related entities in a specific order according to their relation from client to nest child relations
  // This is done to handle cascading deletions and dependencies between entities

  // Delete clocked hours related to roles
  await Promise.all(
    roleIds.map(async (roleid) => {
      await clock_hours.delete({ role: { id: roleid } });
    }),
  );

  // Delete interviews related to roles
  await Promise.all(
    roleIds.map(async (roleid) => {
      await interview.delete({ role: { id: roleid } });
    }),
  );

  // Delete developers related to roles
  await Promise.all(
    roleIds.map(async (roleid) => {
      await developer.delete({ roles: { id: roleid } });
    }),
  );

  // Delete applicants related to roles
  await Promise.all(
    roleIds.map(async (roleid) => {
      await applicant.delete({ role: { id: roleid } });
    }),
  );

  // Delete jobs related to roles
  await Promise.all(
    roleIds.map(async (roleid) => {
      await job.delete({ role: { id: roleid } });
    }),
  );

  // Delete roles themselves
  await Promise.all(
    roleIds.map(async (roleid) => {
      await roles.delete({ id: roleid });
    }),
  );

  // Delete the main client entity
  const { affected } = await transaction
    .getRepository(dependencies.db.models.client)
    .delete({
      id,
    });

  // Return the number of affected rows
  return affected;
}
export async function updateClient(
  id: string,
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
      const data = await clientRepo.update({ id }, { ...updates });
      return data;
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
