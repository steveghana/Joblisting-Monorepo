import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import Roles from '../dataManager';
import Client from '../../clients/dataManager';
import { useTransaction } from '../../../util/transaction';
import { Dependencies } from '../../../util/dependencyInjector';
import { getAllRoles } from '../DBQueries';
import { IRole } from '@/types/role';

@Injectable()
export class RolesService {
  public async create(
    createRoleDto: CreateRoleDto,
    dependencies: Dependencies = null,
  ) {
    const { clientId } = createRoleDto;
    return useTransaction(async (transaction) => {
      let clientDetails = await Client.getById(clientId);
      const { data } = await Roles.createRoles(
        {
          client: clientDetails.data,
          ...createRoleDto['Project Details'],
          vacancy_status:
            createRoleDto['Role Info'].whenToStart !== 'I will decide later'
              ? 'Open'
              : 'Closed',
        },
        {
          ...createRoleDto['Role Info'],
        },
        transaction,
        dependencies,
      );
      return data;
    });
  }

  getAllApplicants(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllRoles(transaction, dependencies);
      if (!data.length) {
        return null;
      }
      return data;
    });
  }
  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllRoles(transaction, dependencies);
      if (!data.length) {
        return null;
      }
      return data;
    });
  }

  getApplicant(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Roles.getById(id);
      console.log(data, 'from client');
      if (!data) {
        return null;
      }
      return data;
    });
  }
  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Roles.getById(id);
      console.log(data, 'from client');
      if (!data) {
        return null;
      }
      return data;
    });
  }

  update(
    id: string,
    updateClientDto: Partial<CreateRoleDto>,
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      // const { , ...rest } = updateClientDto;
      const data = await Roles.update(
        id,
        {
          selectedSkills: updateClientDto['Role Info'].selectedSkills,
          ...updateClientDto['Project Details'],
          ...updateClientDto['Role Info'],
        },
        transaction,
      );
      if (!data) {
        throw new HttpException(
          'Something went wrong, couldnt update role',
          HttpStatus.BAD_REQUEST,
        );
      }
      return data;
    });
  }

  remove(id: string, dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const deleted = await Roles.destroy(id, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete role',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
