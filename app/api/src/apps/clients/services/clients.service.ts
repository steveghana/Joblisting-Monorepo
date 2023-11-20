import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientFormDataDto } from '../dto/create-client.dto';
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
          industry: ['Tech', 'Real Estate'],
          startDate: new Date(),
          ...createClientDto['Client info'],
          communicationPreferences:
            createClientDto['Communication Type'].communicationPreferences,
        },
        transaction,
        dependencies,
      );
      if (clientMethods.exists) {
        console.log('throwing new exceptions ...........');
        console.log(client);
        throw new HttpException(
          'client already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const {
        'Additional Data': additionalData,
        'Client info': clientInfo,
        'Communication Type': communicationType,
        'Project Details': projectDetails,
      } = createClientDto;

      const role = await Roles.createRoles(
        {
          client,
          clientId: client.id,
          title: client.projectTitle,
          description: client.description,
          vacancy_status:
            additionalData.whenToStart !== 'i will decide later'
              ? 'Open'
              : 'Closed',
          skills_required: projectDetails.selectedSkills,
          numOfEmployees: clientInfo.numOfEmployees,
          ...additionalData,
          ...projectDetails,
        },
        transaction,
        dependencies,
      );
      console.log(client, 'client data');

      return { client, role };
    });
  }

  findAll() {
    return useTransaction(async (transaction) => {
      const data = await Client.getAll();
      return data;
    });
  }

  findOne(id: number) {
    return useTransaction(async (transaction) => {
      const data = await Client.getById(id);
      return data;
    });
  }

  update(id: number, updateClientDto: Partial<IClientFormData>) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
