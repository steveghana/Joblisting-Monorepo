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
import { IStatusApplication } from '@/types/application';
import User from '../../../apps/auth/dataManager/userEntity';

@Injectable()
export class ApplicationsService {
  constructor(private readonly developersService: DevelopersService) {}

  create(
    createApplicationDto: CreateApplicationDto,
    dependencies: Dependencies = null,
  ) {
    const { roleId, years_of_experience, ...rest } = createApplicationDto;
    return useTransaction(async (transaction) => {
      console.log(createApplicationDto.email);
      const existinguser = await User.getByEmails(
        [createApplicationDto.email],
        transaction,
      );
      if (existinguser.length) {
        throw new HttpException(
          'A user with the same email already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
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
        { ...rest, years_of_experience },
        transaction,
        dependencies,
      );
    });
  }

  findAll(roleId: string, dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllApplicants(roleId, transaction, dependencies);
      if (!data.length) {
        return [];
      }
      return data;
    });
  }

  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Application.getById(id);
      if (!data) {
        return null;
      }
      return data;
    });
  }

  update(
    id: string,
    status: IStatusApplication,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);
    return useTransaction(async (transaction) => {
      const applicant = await Application.getById(id);
      const {
        address,
        email,
        name,
        phoneNumber: phone_number,
        selectedSkills,
        role: { id: roleId },
        years_of_experience,
      } = applicant;
      if (status === 'Accepted') {
        const enrollDev = await this.developersService.create({
          address,
          email,
          salary: 0, //initial value of 0
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1] || '',
          phone_number,
          skills: selectedSkills,
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
        const deletedApplicant = await Application.destroy(id, transaction);
        return deletedApplicant;
      }
      const data = await Application.update(id, { status }, transaction);
      if (!data) {
        throw new HttpException(
          'Something went wrong, couldnt update role',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return data;
    });
  }

  remove(id: string) {
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
