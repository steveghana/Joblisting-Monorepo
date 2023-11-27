import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseFilters,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationError, validate } from 'class-validator';
import { HttpExceptionFilter } from '../../../middleware/err.Middleware';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Response } from 'express';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiTags('create a role')
  @ApiOperation({
    description: 'creating a role associated with a specific client',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async create(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    const result = await this.rolesService.create(createRoleDto);
    return res.json(result);
  }

  @Get()
  @ApiTags('Get roles')
  @ApiOperation({
    description: 'Get all roles with their client relations',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findAll(@Res() res: Response) {
    const result = await this.rolesService.findAll();
    return res.json(result);
  }

  @Get(':id')
  @ApiTags('Get a role by id')
  @ApiOperation({
    description: 'Get a single role by id',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.rolesService.findOne(id);
    return res.json(result);
  }

  @Patch(':id')
  @ApiTags('update a role')
  @ApiOperation({
    description: 'update a role',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: Partial<CreateRoleDto>,
    @Res() res: Response,
  ) {
    const result = await this.rolesService.update(id, updateRoleDto);
    return res.json(result);
  }

  @Delete(':id')
  @ApiTags('delete a role')
  @ApiOperation({
    description: 'delete a role',
  })
  @UseFilters(new HttpExceptionFilter())
  @ApiBadRequestResponse({ description: 'Bad Request something went wrong' })
  @ApiInternalServerErrorResponse({ description: 'Server is down' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.rolesService.remove(id);
    return res.json(result);
  }
}
