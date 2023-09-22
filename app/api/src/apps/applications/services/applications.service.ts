import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import Application from '../dataManager';
import { useTransaction } from '@/util/transaction';
import { Dependencies } from '@/util/dependencyInjector';

@Injectable()
export class ApplicationsService {
  create(
    createApplicationDto: CreateApplicationDto,
    dependencies: Dependencies = null,
  ) {
    const { roleId, developer, ...rest } = createApplicationDto;
    return useTransaction(async (transaction) => {
      return await Application.createApplication(
        roleId,
        rest,
        transaction,
        dependencies,
      );
    });
    return 'This action adds a new application';
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
