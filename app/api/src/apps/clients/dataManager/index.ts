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
  static async getAll(dependencies: Dependencies = null): Promise<Client[]> {
    dependencies = injectDependencies(dependencies, ['db']);
    const newClients: Client[] = [];

    // Fetch all clients
    const allClientsData = await getAllClients(null, dependencies);

    // Create Client instances for each fetched data
    for (const clientData of allClientsData) {
      const newClient = new Client(dependencies);
      newClient.data = clientData;
      newClients.push(newClient);
    }

    return newClients;
  }

  get id(): number | number[] {
    if (Array.isArray(this.data)) {
      return this.data.map((client) => client.id);
    }
    return this.data.id;
  }

  get email(): string | string[] {
    if (Array.isArray(this.data)) {
      return this.data.map((client) => client.email);
    }
    return this.data.email;
  }

  get industry(): string[] | string[][] {
    if (Array.isArray(this.data)) {
      return this.data.map((client) => client.industry);
    }
    return this.data.industry;
  }

  get name(): string | string[] {
    if (Array.isArray(this.data)) {
      return this.data.map((client) => client.name);
    }
    return this.data.name;
  }

  // ... modify other getters as needed ...

  get phone_number(): string | string[] {
    if (Array.isArray(this.data)) {
      return this.data.map((client: IClient) => client.phoneNumber);
    }
    return this.data.phoneNumber;
  }
  get description(): string | string[] {
    if (Array.isArray(this.data)) {
      return this.data.map((client: IClient) => client.description);
    }
    return this.data.description;
  }
  get exists(): boolean {
    return Array.isArray(this.data) ? this.data.length > 0 : this.data !== null;
  }
}

export default Client;
