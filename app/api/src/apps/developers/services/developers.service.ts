import { Injectable } from '@nestjs/common';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { CreateUserDto } from '@/apps/users/dto/create-user.dto';
import { useTransaction } from '@/util/transaction';

@Injectable()
export class DevelopersService {
  create(createDeveloperDto: CreateDeveloperDto & CreateUserDto) {
    // createDeveloperDto.
    return useTransaction(async (transaction) => {});

    return 'This action adds a new developer';
  }

  findAll() {
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
