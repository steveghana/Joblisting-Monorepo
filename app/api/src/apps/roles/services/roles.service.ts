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
    const { clientId, ...rest } = createRoleDto;
    return useTransaction(async (transaction) => {
      let clientDetails = await Client.getById(clientId);

      const { data } = await Roles.createRoles(
        {
          client: clientDetails.data,
          aboutTheProject: createRoleDto.aboutTheProject,

          ...rest,
          vacancy_status:
            createRoleDto.whenToStart !== 'I will decide later'
              ? 'Open'
              : 'Closed',
          skills_required: createRoleDto.selectedSkills,
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

  getApplicant(id: number) {
    return useTransaction(async (transaction) => {
      const data = await Roles.getById(id);
      console.log(data, 'from client');
      if (!data) {
        return null;
      }
      return data;
    });
  }
  findOne(id: number) {
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
    id: number,
    updateClientDto: Partial<CreateRoleDto>,
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      const { selectedSkills, ...rest } = updateClientDto;
      const data = await Roles.update(
        id,
        { skills_required: selectedSkills, ...rest },
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

  remove(id: number, dependencies: Dependencies = null) {
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
