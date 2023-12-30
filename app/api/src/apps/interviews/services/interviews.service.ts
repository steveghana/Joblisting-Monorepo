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
      const dev = await Developers.getById(createInterviewDto.candidateId);
      if (dev.candidate) {
        throw new HttpException(
          `This candidate ${dev.candidate.candidate.firstName} is already in an interview process`,
          HttpStatus.BAD_REQUEST,
        );
      }
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
      // const  {g} = interviews
      return interviews.map((interview) => {
        const {
          candidate: { user, ...otherItems },
          guests,
          ...rest
        } = interview;
        return {
          ...rest,
          candidate: {
            ...otherItems,
            id: interview.candidate.id,
            email: interview.candidate.user.email,
            avatar: user.avatar,
          },
          guests: guests.map(({ user, ...rest }, _) => {
            return {
              ...rest,
              id: user.id,
              email: user.email,
              avatar: user.avatar,
            };
          }),
        };
      });
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
