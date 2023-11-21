import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import Application from '../dataManager';
import cryptoUtil from '../../../util/crypto';

import {
  generateAlphanumeric,
  useTransaction,
} from '../../../util/transaction';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import Roles from '../../../apps/roles/dataManager';
import { getAllApplicants } from '../DBQueries';
import Developers from '../../../apps/developers/dataManager';

@Injectable()
export class ApplicationsService {
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
    updateClientDto: Partial<CreateApplicationDto>,
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
      } = updateClientDto;
      if (status === 'Accepted') {
        const role = await Roles.getById(roleId);
        if (!role) {
          throw new HttpException(
            'The role you are about to assign a new developer to doesnt exist',
            HttpStatus.BAD_REQUEST,
          );
        }
        const dummyTemporalPassword = await generateAlphanumeric(7);

        const passwordHash = await cryptoUtil.hash(
          dummyTemporalPassword,
          dependencies?.config?.authentication?.passwordHashIterations || 10, // Default iterations
        );

        if (!passwordHash) {
          throw new HttpException(
            'Failed to hash the password',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        await Developers.enrollDev({
          roles: role,
          address,
          name,
          phone_number,
          user: { address, email, fullName: name, password: passwordHash },
          role_status: 'Accepted',
          skills,
          years_of_experience,
        });
        void dependencies.email.sendStyled({
          to: [email],
          subject: 'Your Role Application has been Accepted',
          html: `<h1>Congratulations!</h1>
    <p>We are pleased to inform you that your application for the [Role Name] role has been accepted.</p>
    <h2>Role Details:</h2>
    <ul>
      <li><strong>Role:</strong>${role.title}</li>
      <li><strong>Description:</strong>${role.description}</li>
      <li><strong>Start Date:</strong>${role.whenToStart}</li>
    </ul>
    <h2>Limited Access:</h2>
    <p>You can now access a restricted part of our system related to the applied role. Please follow the instructions below:</p>
    <ol>
      <li>Access the [Your Platform Name] portal.</li>
      <li>Use the following temporary credentials:
        <ul>
          <li><strong>email:</strong> ${email}</li>
          <li><strong>Password:</strong>${dummyTemporalPassword}</li>
        </ul>
      </li>
    </ol>
    <h2>Next Steps:</h2>
    <p>Once you log in, you'll be prompted to complete your registration by providing additional information and setting up a permanent username and password.</p>
    <p>If you have any questions or need assistance, please contact our support team at [Support Email or Phone Number].</p>
    <p>Thank you for choosing [Your Company Name]!</p>
    <p>Best regards,<br>Savannah Tech.io</p>`,
        });
      }
      const data = await Application.update(id, updateClientDto, transaction);
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
