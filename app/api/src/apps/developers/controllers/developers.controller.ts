import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto, @Res() res: Response) {
    // const { email, password, phone_number, username, address, firstName, lastName } = createDeveloperDto;

    // const userData = this.authservice.register(email, password,firstName, lastName, "developer" )
    const result = this.developersService.create(createDeveloperDto);
    return res.json(result);
  }

  @Get()
  findAll(@Res() res) {
    const result = this.developersService.findAll();
    res.json(result);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const result = this.developersService.findOne(+id);
    return res.json(result);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeveloperDto: UpdateDeveloperDto,
  ) {
    return this.developersService.update(+id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developersService.remove(+id);
  }
}
