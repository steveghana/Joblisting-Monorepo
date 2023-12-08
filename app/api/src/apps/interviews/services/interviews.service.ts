import { CreateInterviewDto } from '../dto/create-interview.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdateInterviewDto } from '../dto/update-interview.dto';
import Interviews from '../dataManager';
import { useTransaction } from '../../../util/transaction';
import Developers from '../../../apps/developers/dataManager';

@Injectable()
export class InterviewsService {
  create(createInterviewDto: CreateInterviewDto) {
    // createInterviewDto.
    return useTransaction(async (transaction) => {
      const interviewResponse = await Interviews.createInterviews(
        createInterviewDto,
        transaction,
      );
      const devId = interviewResponse.candidate.id;
      await Developers.update(
        devId,

        { role_status: 'Interviewing' },
        transaction,
      );
      return interviewResponse;
    });
  }

  findAll() {
    return `This action returns all interviews`;
  }

  findOne(id: string) {
    return `This action returns a #${id} interview`;
  }

  update(id: string, updateInterviewDto: UpdateInterviewDto) {
    return `This action updates a #${id} interview`;
  }

  cancel(interviewId: string) {
    return useTransaction(async (transaction) => {
      const {
        candidate: { id },
      } = await Interviews.getById(interviewId);
      const updateDev = await Developers.update(
        id,
        { role_status: 'Pending' },
        transaction,
      );

      const canceldInterview = await Interviews.cancleInterview(
        id,
        transaction,
      );
      if (!canceldInterview) {
        throw new HttpException(
          'Couldnt cancel interview, please try again later',
          HttpStatus.BAD_REQUEST,
        );
        //NOtify the respective candidates the interview has been canceled
      }
      return canceldInterview;
    });
  }
}
