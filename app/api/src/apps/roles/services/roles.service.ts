import { CreateRoleDto, JobInfo, RoleInfoDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import Roles from '../dataManager';
import Client from '../../clients/dataManager';
import { useTransaction } from '../../../util/transaction';
import { Dependencies } from '../../../util/dependencyInjector';
import { deleteJob, getAllRoles } from '../DBQueries';
import { IRole } from '../../../types/role';
import { createRoleLink } from '../../../apps/Shorturl/service/util';
import ShortUrl from '@/apps/Shorturl/dataManager/shortUrl';
import { data } from '@/mockdata';

@Injectable()
export class RolesService {
  public async create(
    clientId: string,
    createRoleDto: CreateRoleDto['Project Details'],
    dependencies: Dependencies = null,
  ) {
    const roleData = await useTransaction(async (transaction) => {
      let clientDetails = await Client.getById(clientId);
      const { data } = await Roles.createRoles(
        {
          client: clientDetails.data,
          ...createRoleDto,
          vacancy_status: 'Open',
        },
        transaction,
        dependencies,
      );
      const link = await createRoleLink(
        clientId,
        data,
        transaction,
        dependencies,
      );
      return { data };
    });

    // Roles.update(roleData.id, {})
    return { ...roleData };
  }
  public async createJob(
    roleId: string,
    createRoleDto: Omit<JobInfo, 'vacancy_status'>,
    dependencies: Dependencies = null,
  ) {
    console.log(roleId, createRoleDto, 'this is the job info');
    return useTransaction(async (transaction) => {
      let roldDetails = await Roles.getById(roleId);

      const data = await Roles.createJobs(
        roldDetails.id,
        {
          ...createRoleDto,
          country: roldDetails.client.country.label,
        },
        transaction,
        dependencies,
      );

      // if (!updatejobs || !link) {
      //   throw new HttpException(
      //     'Couldnt create a link for this project',
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
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
  deleteJob(id: string, dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const deleted = await deleteJob(id, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete role',
          HttpStatus.BAD_REQUEST,
        );
      }
      return deleted;
    });
  }
}
