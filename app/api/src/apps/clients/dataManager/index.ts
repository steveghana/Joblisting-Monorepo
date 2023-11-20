import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import {
  // createClient,
  getAllClients,
  getClientById,
  findElseCreateClient,
} from '../DBQueries/index';
import { EntityManager } from 'typeorm';
import { IClient } from '@/types/client';
import { ClientFormDataDto } from '../dto/create-client.dto';

class Client {
  dependencies: Dependencies = null;
  data: IClient = null;
  _isNewlyCreated = null;

  constructor(dependencies: Dependencies = null) {
    this.dependencies = injectDependencies(dependencies, ['db', 'config']);
  }

  static async findElseCreate(
    clientDetails: IClient & { communicationPreferences: string },
    transaction: EntityManager,
    dependencies: Dependencies = null,
  ): Promise<[IClient, Client]> {
    dependencies = injectDependencies(dependencies, ['db']);
    const [clientData, isNewlyCreated] = await findElseCreateClient(
      clientDetails.email.toLowerCase(),
      clientDetails,
      transaction,
      dependencies,
    );
    const newclient = new Client(dependencies);
    (newclient.data as unknown) = clientData;
    (newclient._isNewlyCreated as unknown) = isNewlyCreated;
    return [clientData, newclient];
  }
  static async getById(
    id: number,
    dependencies: Dependencies = null,
  ): Promise<Client> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newclient = new Client(dependencies);
    newclient.data = await getClientById(id, null, dependencies);

    return newclient;
  }
  // static async getAll(
  //   transaction: EntityManager,
  //   dependencies: Dependencies = null,
  // ): Promise<Client[]> {
  //   dependencies = injectDependencies(dependencies, ['db']);
  //   const newClients: Client[] = [];

  //   // Fetch all clients
  //   const allClientsData = await getAllClients(transaction, dependencies);
  //   console.log(allClientsData, 'from clients');
  //   // Create Client instances for each fetched data
  //   // for (const clientData of allClientsData) {
  //     const newClient = new Client(dependencies);
  //     newClient.data = clientData;
  //     newClients.push(newClient);
  //   // }

  //   return newClients;
  // }

  get id(): number {
    return this.data.id;
  }

  get email(): string {
    return this.data.email;
  }

  get industry(): string[] {
    return this.data.industry;
  }

  get name(): string {
    return this.data.name;
  }

  // ... modify other getters as needed ...

  get phone_number(): string {
    return this.data.phoneNumber;
  }
  get description(): string {
    return this.data.description;
  }
  get exists(): boolean {
    return this.data !== null;
  }
}

export default Client;
