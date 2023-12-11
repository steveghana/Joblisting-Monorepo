import { IDev } from '@/types/developer';
import { Iinterviews } from '@/types/interviews';
import { IRole } from '@/types/role';
import { IsNotEmpty } from 'class-validator';
type IinterviewAs = 'interviewee' | 'guest';

export class CreateInterviewDto {
  @IsNotEmpty({
    message: 'please enter interview status',
  })
  status: 'Scheduled' | 'Completed' | 'Canceled';
  @IsNotEmpty({
    message: 'interviewee Id is required',
  })
  candidateId: string;
  @IsNotEmpty({
    message: 'guest Id is required',
  })
  guests: string[];

  @IsNotEmpty({
    message: 'guest Id is required',
  })
  eventType: string;
  @IsNotEmpty({
    message: 'guest Id is required',
  })
  eventOption: string;
  @IsNotEmpty({
    message: 'desicrpit Id is required',
  })
  description: string;
  @IsNotEmpty({
    message: 'even link Id is required',
  })
  eventLInk: string;
  @IsNotEmpty({
    message: 'start time is required',
  })
  starttime: string;
  @IsNotEmpty({
    message: 'end time is required',
  })
  endtime: string;
  @IsNotEmpty({
    message: 'start date is required',
  })
  startDate: Date;
  @IsNotEmpty({
    message: 'end date is required',
  })
  endDate: Date;
  // role: IRole;
}
