import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import Roles from '../dataManager';
import Client from '@/apps/clients/dataManager';

@Injectable()
export class RolesService {
  public async create(createRoleDto: CreateRoleDto) {
    const { client, ...rest } = createRoleDto;
    const clientDetails = await Client.getById(createRoleDto.clientId);

    const data = await Roles.createRoles({
      ...rest,
      client: clientDetails.data,
      vacancy_status: 'Open',
    });
    return data;
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
