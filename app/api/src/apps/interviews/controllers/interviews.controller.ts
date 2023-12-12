import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { InterviewsService } from '../services/interviews.service';
import { CreateInterviewDto } from '../dto/create-interview.dto';
import { UpdateInterviewDto } from '../dto/update-interview.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  @ApiTags('creat interview')
  @ApiOperation({
    description: 'create a new interview',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  public async create(@Body() createInterviewDto: CreateInterviewDto) {
    const result = await this.interviewsService.create(createInterviewDto);
    return result;
  }

  @Get()
  @ApiTags('get interviews')
  @ApiOperation({
    description: 'Get all interviews',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  public async findAll() {
    const result = await this.interviewsService.findAll();
    return result;
  }

  @Get(':id')
  @ApiTags('get interview')
  @ApiOperation({
    description: 'Get an interview',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  public async findOne(@Param('id') id: string) {
    const result = await this.interviewsService.findOne(id);
    return result;
  }

  @Patch(':id')
  @ApiTags('Update interview')
  @ApiOperation({
    description: 'Update an interview',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  public async update(
    @Param('id') id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    const result = await this.interviewsService.update(id, updateInterviewDto);
    return result;
  }

  @Delete(':id')
  @ApiTags('Delete interview')
  @ApiOperation({
    description: 'Delete an interview',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async remove(@Param('id') id: string) {
    const result = await this.interviewsService.cancel(id);
    return result;
  }
}
