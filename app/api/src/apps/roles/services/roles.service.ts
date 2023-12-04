import { CreateRoleDto, RoleInfoDto } from '../dto/create-role.dto';
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
    clientId: string,
    createRoleDto: CreateRoleDto['Project Details'],
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      let clientDetails = await Client.getById(clientId);
      const { data } = await Roles.createRoles(
        {
          client: clientDetails.data,
          ...createRoleDto['Project Details'],
        },
        transaction,
        dependencies,
      );
      return data;
    });
  }
  public async createJob(
    roleId: string,
    createRoleDto: RoleInfoDto[],
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      let roldDetails = await Roles.getById(roleId);
      const { data } = await Roles.createJobs(
        roleId,
        {
          ...createRoleDto['Role Info'],
          country: roldDetails.client.country.label,
          vacancy_status:
            createRoleDto['Role Info'].whenToStart !== 'I will decide later'
              ? 'Open'
              : 'Closed',
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
    updateClientDto: Partial<IRole>,
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      // const { , ...rest } = updateClientDto;
      console.log(updateClientDto);
      const data = await Roles.update(
        id,
        {
          // selectedSkills: updateClientDto['Role Info']?.selectedSkills,
          ...updateClientDto,
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
      console.log(id, deleted);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete role',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
