import { CreateInterviewDto } from '../dto/create-interview.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdateInterviewDto } from '../dto/update-interview.dto';
import Interviews from '../dataManager';
import { useTransaction } from '../../../util/transaction';
import Developers from '../../../apps/developers/dataManager';
import { getAllInterviews } from '../DBQueries';

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
    return useTransaction(async (transaction) => {
      const interviews = await getAllInterviews(transaction);
      if (!interviews.length) {
        return [];
      }
      return interviews;
    });
  }

  findOne(id: string) {
    return useTransaction(async (transaction) => {
      const interview = await Interviews.getById(id);
      console.log(interview);
      return interview;
    });
  }

  update(id: string, updateInterviewDto: UpdateInterviewDto) {
    return useTransaction(async (transaction) => {
      const updated = await Interviews.updateInterviews(
        id,
        updateInterviewDto,
        transaction,
      );
      if (!updated) {
        return null;
      }
      return updated;
    });
  }

  cancel(interviewId: string) {
    return useTransaction(async (transaction) => {
      const data = await Interviews.getById(interviewId);
      const { affected } = await Developers.update(
        data.candidate.id,
        { role_status: 'Pending' },
        transaction,
      );
      if (!affected) {
        throw new HttpException(
          'Couldnt cancel interview, please try again later',
          HttpStatus.BAD_REQUEST,
        );
      }

      const canceldInterview = await Interviews.cancleInterview(
        data.id,
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
