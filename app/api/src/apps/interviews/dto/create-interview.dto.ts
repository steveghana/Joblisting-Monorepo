import { IDev } from '@/types/developer';
import { Iinterviews } from '@/types/interviews';
import { IRole } from '@/types/role';
import { IsNotEmpty } from 'class-validator';
type IinterviewAs = 'interviewee' | 'interviewer';
type Interview = Iinterviews & {
  interviewAs: IinterviewAs;
  interveiweeId: number;
  interviewerId: number;
};
export class CreateInterviewDto implements Interview {
  interviewAs: IinterviewAs;
  @IsNotEmpty({
    message: 'please enter your address',
  })
  roleId: number;
  @IsNotEmpty({
    message: 'please enter your scheduled date',
  })
  scheduled_date: Date;
  status: 'Scheduled' | 'Completed' | 'Canceled';
  @IsNotEmpty({
    message: 'interviewee Id is required',
  })
  interveiweeId: number;
  @IsNotEmpty({
    message: 'interviewer Id is required',
  })
  interviewerId: number;
  interviewee: IDev;
  interviewer: IDev;
  role: IRole;
}
