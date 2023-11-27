import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientDto, ClientFormDataDto } from '../dto/create-client.dto';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
// import { UpdateClientDto } from '../dto/update-client.dto';
import Client from '../dataManager';
import { IClientFormData } from '../../../types/client';
import { useTransaction } from '../../../Config/transaction';
import Roles from '../../../apps/roles/dataManager';
import { getAllClients } from '../DBQueries';

@Injectable()
export class ClientsService {
  create(
    createClientDto: ClientFormDataDto,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);
    return useTransaction(async (transaction) => {
      const [client, clientMethods] = await Client.findElseCreate(
        {
          //TODO change  industry and startDate later
          // industry: ['Tech', 'Real Estate'],

          startDate: new Date(),
          communicationPreferences:
            createClientDto['Project Details'].communicationPreferences,
          ...createClientDto['Client Info'],
        },
        transaction,
        dependencies,
      );
      if (!clientMethods._isNewlyCreated) {
        console.log('throwing new exceptions ...........');
        console.log(client);
        throw new HttpException(
          'client already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const {
        'Role Info': roleinfo,
        'Client Info': clientInfo,
        'Project Details': projectDetails,
      } = createClientDto;

      const role = await Roles.createRoles(
        {
          client,
          clientId: client.id,
          title: client.projectTitle,
          // aboutCompany: client.aboutTheCompany,
          vacancy_status:
            roleinfo.whenToStart !== "I'll decide later" ? 'Open' : 'Closed',
          // selectedSkills: projectDetails.selectedSkills,
          ...projectDetails,
        },
        roleinfo,
        transaction,
        dependencies,
      );
      // console.log(client, role, 'client data');

      return client;
    });
  }

  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllClients(transaction, dependencies);
      if (!data.length) {
        return null;
      }
      return data;
    });
  }

  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Client.getById(id);
      console.log(data.data, 'from client');
      if (!data.data) {
        return null;
      }
      return data.data;
    });
  }

  update(
    id: string,
    updateClientDto: Partial<IClientFormData['Client info']>,
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      const data = await Client.update(id, updateClientDto, transaction);
      if (!data) {
        throw new HttpException(
          'Something went wrong, couldnt update client',
          HttpStatus.BAD_REQUEST,
        );
      }
      return data;
    });
  }

  remove(id: string, dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const deleted = await Client.destroy(id, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete client',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
