import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from '../dto/create-interview.dto';
import { UpdateInterviewDto } from '../dto/update-interview.dto';
import Interviews from '../dataManager';

@Injectable()
export class InterviewsService {
  create(createInterviewDto: CreateInterviewDto) {
    // createInterviewDto.
    const { roleId, ...rest } = createInterviewDto;
    Interviews.createInterviews(roleId, rest);
    return 'This action adds a new interview';
  }

  findAll() {
    return `This action returns all interviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(id: number, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
