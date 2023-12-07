import { Injectable } from '@nestjs/common';
import { CreateInterviewDto } from '../dto/create-interview.dto';
import { UpdateInterviewDto } from '../dto/update-interview.dto';
import Interviews from '../dataManager';
import { useTransaction } from '../../../util/transaction';

@Injectable()
export class InterviewsService {
  create(createInterviewDto: CreateInterviewDto) {
    // createInterviewDto.
    return useTransaction(async (transaction) => {
      return Interviews.createInterviews(createInterviewDto, transaction);
    });
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
