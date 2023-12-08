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
          startDate: new Date(),
          communicationPreferences:
            createClientDto['Project Details'].communicationPreferences,
          ...createClientDto['Client Info'],
        },
        transaction,
        dependencies,
      );
      if (!clientMethods._isNewlyCreated) {
        throw new HttpException(
          'client already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { 'Role Info': roleinfo, 'Project Details': projectDetails } =
        createClientDto;

      const { data } = await Roles.createRoles(
        {
          client,
          clientId: client.id,
          title: client.projectTitle,
          ...projectDetails,
          vacancy_status:
            roleinfo.whenToStart !== 'I will decide later' ? 'Open' : 'Closed',
        },
        transaction,
        dependencies,
      );
      await Roles.createJobs(
        data.id,
        {
          ...roleinfo,
          country: client.country.label,
        },
        transaction,
        dependencies,
      );

      return client;
    });
  }

  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllClients(transaction, dependencies);
      if (!data.length) {
        return null;
      }
      return data.map(({ developers, roles, country, ...rest }) => {
        return {
          developersLength: developers.length,
          // rolesOpen: roles.filter((role) => role.vacancy_status === 'Open')
          //   .length,
          roles: roles,
          countrylabel: country.label,
          ...rest,
        };
      });
    });
  }

  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Client.getById(id);
      if (!data.data) {
        return null;
      }
      const { developers, ...rest } = data.data;
      const devInfo = developers.map((dev) => ({
        id: dev.id,
        salary: dev.salary,
        avatar: dev.user.avatar,
        firstName: dev.firstName,
        lastName: dev.lastName,
        address: dev.address,
        phoneNumber: dev.phone_number,
        role: dev.user.role,
        startedAt: dev.user.createdAt,
        email: dev.user.email,
        hours: dev.clockHours,
      }));
      return {
        developers: devInfo,
        ...rest,
      };
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

  remove(id: string, roleIds: string[], dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const deleted = await Client.destroy(id, roleIds, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete client',
          HttpStatus.BAD_REQUEST,
        );
      }
      return deleted;
    });
  }
}
