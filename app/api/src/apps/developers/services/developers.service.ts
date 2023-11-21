import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { CreateUserDto } from '../../../apps/users/dto/create-user.dto';
import {
  generateAlphanumeric,
  useTransaction,
} from '../../../util/transaction';
import Developers from '../dataManager';
import User from '@/apps/auth/services/userEntity';
import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { IUser } from '@/types/user';
import Roles from '../../../apps/roles/dataManager';
import cryptoUtil from '../../../util/crypto';

@Injectable()
export class DevelopersService {
  create(
    createDeveloperDto: Partial<CreateDeveloperDto>,
    dependencies: Dependencies = null,
  ) {
    dependencies = injectDependencies(dependencies, ['db', 'config', 'email']);

    // createDeveloperDto.
    return useTransaction(async (transaction) => {
      const {
        address,
        email,
        name,
        phone_number,
        roles,
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
      const devEnrolled = await Developers.enrollDev({
        roles,
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
      return devEnrolled;
    });
  }

  findAll() {
    // throw new HttpException('exists', HttpStatus.BAD_REQUEST);
    return `This action returns all developers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
