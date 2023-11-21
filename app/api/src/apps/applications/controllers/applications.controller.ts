import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  UseFilters,
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
    console.log(application, 'app data');
    const result = await this.applicationsService.create(application);
    return res.json(result);
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

    @Body() application: CreateApplicationDto,
    @Res() res: Response,
  ) {
    const result = await this.applicationsService.findOne(+id);
    return res.json(result);
  }
  @Get('')
  @ApiTags('Get applicants')
  @ApiOperation({
    description: 'Get all applicants related to a specifi role',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findAll(@Res() res: Response) {
    const result = await this.applicationsService.findAll();
    return res.json(result);
  }
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.applicationsService.remove(+id);
    return res.json(result);
  }
}
