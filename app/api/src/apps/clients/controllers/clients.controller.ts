import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
// import { CreateClientDto } from '../dto/create-client.dto';
// import { UpdateClientDto } from '../dto/update-client.dto';
import { IClientFormData } from '@/types/client';
import { Response } from 'express';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: any, @Res() res: Response) {
    console.log(createClientDto, 'this is the data from the client');
    throw new HttpException(
      'user already exists, try signing up',
      HttpStatus.BAD_REQUEST,
    );
    // return res.json(
    //   new HttpException(
    //     'user already exists, try signing up',
    //     HttpStatus.BAD_REQUEST,
    //   ),
    // );
    // return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<IClientFormData>,
  ) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
