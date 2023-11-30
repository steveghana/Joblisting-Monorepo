import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import {
  generateAlphanumeric,
  useTransaction,
} from '../../../util/transaction';
import Developers from '../dataManager';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import Roles from '../../../apps/roles/dataManager';
import cryptoUtil from '../../../util/crypto';
import { getAllDevs } from '../DBQueries';
import User from '../../auth/dataManager/userEntity';
import { IDev } from '@/types/developer';
@Injectable()
export class DevelopersService {
  public async create(
    createDeveloperDto: Partial<CreateDeveloperDto>,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);
    const {
      address,
      email,
      firstName,
      salary,
      lastName,
      phone_number,
      skills,
      roleId,
      years_of_experience,
    } = createDeveloperDto;
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
    // createDeveloperDto.
    return useTransaction(async (transaction) => {
      const [user, UserMethods] = await User.findElseCreate(
        {
          email,
          role: 'Developer',
          firstName,
          lastName,
        },
        passwordHash,
        transaction,
        dependencies,
      );
      if (!(await UserMethods.isNewlyCreated)) {
        console.log('throwing new exceptions ...........');

        throw new HttpException(
          'This user already exists in the system',
          HttpStatus.BAD_REQUEST,
        );
      }

      await UserMethods.update(
        {
          password: passwordHash,
        },
        transaction,
      );

      const devEnrolled = await Developers.enrollDev(
        {
          roles: role,
          address,
          salary: salary || 0,
          firstName,
          client: role.client,
          lastName,
          phone_number,
          user,
          role_status: 'Accepted',
          skills,
          years_of_experience,
        },
        transaction,
      );

      void dependencies.email.sendStyled({
        to: [email],
        subject: 'Your Role Application has been Accepted',
        html: `<h1>Congratulations!</h1>
      <p>We are pleased to inform you that your application for the [Role Name] role has been accepted.</p>
      <h2>Role Details:</h2>
      <ul>
        <li><strong>Role:</strong>${role.title}</li>
        <li><strong>Description:</strong>${role.aboutTheProject}</li>
        <li><strong>Start Date:</strong>${role.createdAt}</li>
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
      return user;
    });
  }

  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllDevs(transaction, dependencies);
      if (!data.length) {
        return [];
      }
      return data.map((item) => ({
        id: item.id,
        firstName: item.user.firstName,
        lastName: item.user.lastName,
        email: item.user.email,
        jobTitle: item.roles.title,
        salary: item.salary,
        startDate: item.createdAt.toLocaleDateString(),
        projectName: item.client.projectTitle,
        avatar: item.user.avatar,
      }));
    });
  }

  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const data = await Developers.getById(id);
      if (!data) {
        return null;
      }
      return data;
    });
  }

  update(
    id: string,
    updateDevDto: Partial<IDev>,
    dependencies: Dependencies = null,
  ) {
    return useTransaction(async (transaction) => {
      console.log(updateDevDto, 'dev tos');
      const data = await Developers.update(id, updateDevDto, transaction);
      if (!data) {
        throw new HttpException(
          'Something went wrong, couldnt update client',
          HttpStatus.BAD_REQUEST,
        );
      }
      return data;
    });
  }

  remove(id: string) {
    return useTransaction(async (transaction) => {
      const {
        user: { id: userId, email },
      } = await Developers.getById(id);
      if (!userId || email) {
        throw new HttpException(
          'The user you are trying to delete doesnt exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const userDeleted = await User.destroy(
        { email, id: userId },
        transaction,
      );
      if (!userDeleted) {
        throw new HttpException(
          'Couldnt delete user, please try again later',
          HttpStatus.BAD_REQUEST,
        );
      }
      const deleted = await Developers.destroy(id, transaction);
      if (!deleted) {
        throw new HttpException(
          'Something went wrong, couldnt delete developer',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
