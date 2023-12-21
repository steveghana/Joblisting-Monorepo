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
import { IDev } from '../../../types/developer';
import { DeveloperAcceptedEmailDraft } from '../../../util/email/emailtexts';
import Interviews from '@/apps/interviews/dataManager';
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
      role_status,
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

    const passwordHash = await this.hashPassword(dummyTemporalPassword);

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
          role_status,
          workStatus: role.client.id ? 'Active' : 'Not Active',
          skills,
          years_of_experience,
        },
        transaction,
      );
      if (
        createDeveloperDto.role_status === 'Accepted' ||
        createDeveloperDto.role_status === 'InHouse' ||
        createDeveloperDto.role_status === 'External'
      ) {
        await DeveloperAcceptedEmailDraft(devEnrolled, dependencies);
      }
      return user;
    });
  }

  /**
   * Hashes the provided password using the cryptoUtil library.
   *
   * @param {string} password - The plaintext password to hash
   * @param {Dependencies} [dependencies] - Optional dependency injection object
   * @returns {Promise<string>} The hashed password
   */
  private async hashPassword(password, dependencies: Dependencies = null) {
    // Hash password logic
    const passwordHash = await cryptoUtil.hash(
      password,
      dependencies?.config?.authentication?.passwordHashIterations || 10, // Default iterations
    );
    return passwordHash;
  }

  findAll(dependencies: Dependencies = null) {
    return useTransaction(async (transaction) => {
      const data = await getAllDevs(transaction, dependencies);
      if (!data.length) {
        return [];
      }
      // console.log(data);

      return data.map((item) => ({
        id: item.id,
        firstName: item.user.firstName,
        interview: item.interview,
        lastName: item.user.lastName,
        clientName: item.client.name,
        companyName: item.client.companyName,
        email: item.user.email,
        jobTitle: item.roles.title,
        workStatus: item.workStatus,
        rolestatus: item.role_status,
        experience: +item.years_of_experience,
        salary: item.salary,
        startDate: item.createdAt,
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
      const data = await Developers.update(id, updateDevDto, transaction);

      const dev = await Developers.getById(id, dependencies);
      if (dev?.candidate?.id) {
        const interviewCancel = await Interviews.cancleInterview(
          dev.candidate.id,
        );
        if (!interviewCancel) {
          return;
        }
      }
      if (updateDevDto.role_status === 'Accepted') {
        const sent = await DeveloperAcceptedEmailDraft(dev, dependencies);
        console.log(sent);
      }
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
      if (!userId || !email) {
        throw new HttpException(
          'The user you are trying to delete doesnt exist',
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
      return deleted;
    });
  }
  bulkremove(ids: string[]) {
    return useTransaction(async (transaction) => {
      return await Promise.all(
        ids.map(async (id) => {
          const {
            user: { id: userId, email },
          } = await Developers.getById(id);
          if (!userId || !email) {
            throw new HttpException(
              'The user you are trying to delete doesnt exist',
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
          return deleted;
        }),
      );
    });
  }
}
