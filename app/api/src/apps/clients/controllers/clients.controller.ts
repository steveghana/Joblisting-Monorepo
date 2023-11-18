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
// import { ClientDto } from './client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientDto } from '../dto/create-client.dto';
import { IClientFormData } from '@/types/client';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiTags('login')
  @ApiOperation({
    description: 'loggin new business',
  })
  // @UsePipes(ValidationPipe)
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  create(@Body() createClientDto: ClientDto, @Res() res: Response) {
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
