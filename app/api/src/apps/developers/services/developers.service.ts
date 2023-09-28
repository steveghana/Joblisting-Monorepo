import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { CreateUserDto } from '../../../apps/users/dto/create-user.dto';
import { useTransaction } from '../../../util/transaction';
import Developers from '../dataManager';
import User from '@/apps/auth/services/userEntity';
import { IUser } from '@/types/user';

@Injectable()
export class DevelopersService {
  create(createDeveloperDto: CreateDeveloperDto) {
    // createDeveloperDto.
    return useTransaction(async (transaction) => {
      // const {email, password, phone_number, username,address,} = createDeveloperDto
      // User.findElseCreate({email, password,firstName,address  })
      Developers.enrollDev(createDeveloperDto, transaction);
    });

    return 'This action adds a new developer';
  }

  findAll() {
    throw new HttpException('exists', HttpStatus.BAD_REQUEST);
    // return `This action returns all developers`;
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
