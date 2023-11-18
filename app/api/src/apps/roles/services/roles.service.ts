import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import Roles from '../dataManager';
import Client from '../../clients/dataManager';
import { useTransaction } from '../../../util/transaction';
import { Dependencies } from '../../../util/dependencyInjector';

@Injectable()
export class RolesService {
  public async create(
    createRoleDto: CreateRoleDto,
    dependencies: Dependencies = null,
  ) {
    const { client, ...rest } = createRoleDto;
    return useTransaction(async (transaction) => {
      let clientDetails = await Client.getById(createRoleDto.clientId);

      const data = await Roles.createRoles(
        {
          client: clientDetails.data,
          ...rest,
        },
        transaction,
        dependencies,
      );
      return data;
    });
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
