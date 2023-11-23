import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import Application from '../dataManager';

import { useTransaction } from '../../../util/transaction';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import Roles from '../../../apps/roles/dataManager';
import { getAllApplicants } from '../DBQueries';
import { DevelopersService } from '../../../apps/developers/services/developers.service';

@Injectable()
export class ApplicationsService {
  constructor(private readonly developersService: DevelopersService) {}

  create(
    createApplicationDto: CreateApplicationDto,
    dependencies: Dependencies = null,
  ) {
    const { roleId, ...rest } = createApplicationDto;
    return useTransaction(async (transaction) => {
      let existingApplicant = await Application.getByEmail(
        createApplicationDto.email,
      );
      if (existingApplicant) {
        throw new HttpException(
          'You have already applied to this role',
          HttpStatus.BAD_REQUEST,
        );
      }
      const role = await Roles.getById(roleId);
      if (!role) {
        throw new HttpException(
          'Something went wrong, the role you were applying for could not be found',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await Application.createApplication(
        role,
        { ...rest },
        transaction,
        dependencies,
      );
    });
  }

  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllApplicants(transaction, dependencies);
      if (!data.length) {
        return null;
      }
      return data;
    });
  }

  findOne(id: number) {
    return useTransaction(async (transaction) => {
      const data = await Application.getById(id);
      console.log(data, 'from client');
      if (!data) {
        return null;
      }
      return data;
    });
  }

  update(
    id: number,
    updateApplication: Partial<CreateApplicationDto>,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);

    return useTransaction(async (transaction) => {
      const {
        status,
        address,
        email,
        name,
        phoneNumber: phone_number,
        skills,
        roleId,
        years_of_experience,
      } = updateApplication;
      if (status === 'Accepted') {
        const enrollDev = await this.developersService.create({
          address,
          email,
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1],
          phone_number,
          skills,
          roleId,
          years_of_experience,
          role_status: 'Accepted',
        });
        if (!enrollDev) {
          throw new HttpException(
            'Something went wrong, couldnt update developer info',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      const data = await Application.update(id, updateApplication, transaction);
      if (!data) {
        throw new HttpException(
          'Something went wrong, couldnt update role',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return data;
    });
  }

  remove(id: number) {
    return useTransaction(async (transaction) => {
      const deleted = await Application.destroy(id, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete applicant',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
