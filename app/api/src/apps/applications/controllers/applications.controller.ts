import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Res,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { Response } from 'express';
import { ApplicationsService } from '../services/applications.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { IStatusApplication } from '@/types/application';
import { data } from '../../../mockdata';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}
  @Post('')
  @ApiTags('create an applicant')
  @ApiOperation({
    description: 'creating an applicant associated with a specific role',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async create(
    @Body() application: CreateApplicationDto,
    @Res() res: Response,
  ) {
    const { roleId, status } = application;
    for (let i = 0; i < data.length; i++) {
      application.roleId;
      await this.applicationsService.create({ roleId, status, ...data[i] });
    }
    // console.log(application, 'app data');
    // data
    return res.json('result');
  }
  //
  @Get(':id')
  @ApiTags('Get applicant')
  @ApiOperation({
    description: 'Get a single applicant by id',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findOne(
    @Param('id') id: string,

    @Res() res: Response,
  ) {
    const result = await this.applicationsService.findOne(id);
    return res.json(result);
  }
  @Patch(':id')
  @ApiTags('Get applicant')
  @ApiOperation({
    description: 'Get a single applicant by id',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async update(
    @Param('id') id: string,
    @Body() body: { status: CreateApplicationDto['status'] },

    @Res() res: Response,
  ) {
    const result = await this.applicationsService.update(id, body.status);
    return res.json(result);
  }
  @Get('/all/:roleid')
  @ApiTags('Get applicants')
  @ApiOperation({
    description: 'Get all applicants related to a specifi role',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findAll(@Res() res: Response, @Param('roleid') roleId: string) {
    const result = await this.applicationsService.findAll(roleId);
    return res.json(result);
  }
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.applicationsService.remove(id);
    return res.json(result);
  }
  @Delete()
  async bulkRemove(@Body() ids: string[], @Res() res: Response) {
    const result = await this.applicationsService.bulkremove(ids);
    return res.json(result);
  }
}
