import { IDev } from '@/types/developer';
import { Iinterviews } from '@/types/interviews';
import { IRole } from '@/types/role';
import { IsNotEmpty } from 'class-validator';
type IinterviewAs = 'interviewee' | 'interviewer';

export class CreateInterviewDto {
  @IsNotEmpty({
    message: 'please enter your scheduled date',
  })
  scheduled_date: Date;
  @IsNotEmpty({
    message: 'please enter interview status',
  })
  status: 'Scheduled' | 'Completed' | 'Canceled';
  @IsNotEmpty({
    message: 'interviewee Id is required',
  })
  candidateId: string;
  @IsNotEmpty({
    message: 'interviewer Id is required',
  })
  interviewerId: string;

  // role: IRole;
}
