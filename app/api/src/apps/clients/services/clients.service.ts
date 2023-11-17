import { Injectable } from '@nestjs/common';
// import { CreateClientDto } from '../dto/create-client.dto';
// import { UpdateClientDto } from '../dto/update-client.dto';
import Client from '../dataManager';
import { IClientFormData } from '@/types/client';

@Injectable()
export class ClientsService {
  create(createClientDto: IClientFormData) {
    // Client.createClient()
    return 'This action adds a new client';
  }

  findAll() {
    return `This action returns all clients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: Partial<IClientFormData>) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
