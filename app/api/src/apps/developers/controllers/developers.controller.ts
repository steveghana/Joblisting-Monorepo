import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseFilters,
  Delete,
  Res,
} from '@nestjs/common';
import { DevelopersService } from '../services/developers.service';
import { CreateDeveloperDto } from '../dto/create-developer.dto';
import { UpdateDeveloperDto } from '../dto/update-developer.dto';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { AuthService } from '../../auth/services/user.service';
import { first } from 'rxjs';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { IDev } from '@/types/developer';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  async create(
    @Body() createDeveloperDto: CreateDeveloperDto,
    @Res() res: Response,
  ) {
    const result = await this.developersService.create(createDeveloperDto);
    return res.json(result);
  }

  @Get()
  @ApiTags('Get applicant')
  @ApiOperation({
    description: 'Get a single applicant by id',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findAll(@Res() res: Response) {
    const result = await this.developersService.findAll();
    return res.json(result);
  }

  @Get(':id')
  @ApiTags('get dev')
  @ApiOperation({
    description: 'get a dev',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.developersService.findOne(id);
    return res.json(result);
  }

  @Patch(':id')
  @ApiTags('update dev')
  @ApiOperation({
    description: 'update a client from the db',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: Partial<IDev>,
    @Res() res: Response,
  ) {
    const { id: devId, salary, ...rest } = updateDeveloperDto;
    const result = await this.developersService.update(id, {
      salary: +salary,
      ...rest,
    });
    return res.json(result);
  }

  @Delete(':id')
  @ApiTags('dlt dev')
  @ApiOperation({
    description: 'delete a client from the db',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.developersService.remove(id);
    return res.json(result);
  }
  @Delete()
  @ApiTags('dlt devs')
  @ApiOperation({
    description: 'delete a client from the db',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async bulkremove(@Body() devIds: string[], @Res() res: Response) {
    const result = await this.developersService.bulkremove(devIds);
    return res.json(result[0]);
  }
}
