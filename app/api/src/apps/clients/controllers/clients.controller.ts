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
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
// import { ClientDto } from './client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientDto, ClientFormDataDto } from '../dto/create-client.dto';
import { IClientFormData } from '../../../types/client';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationError, validate } from 'class-validator';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';

@Controller('client')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiTags('creat client')
  @ApiOperation({
    description: 'loggin new business',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async create(
    @Body() createClientDto: ClientFormDataDto,
    @Res() res: Response,
  ) {
    const result = await this.clientsService.create(createClientDto);
    return res.status(200).send(result);
  }

  @Get()
  findAll(@Res() res: Response) {
    const result = this.clientsService.findAll();
    return result;
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
