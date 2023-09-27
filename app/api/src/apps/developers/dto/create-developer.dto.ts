import { ClockHours } from '@/apps/clocked-hours/entities/clocked-hour.entity';
import { Interview } from '@/apps/interviews/entities/interview.entity';
import { IDev } from '@/types/developer';
import { IRole } from '@/types/role';
import { IUser } from '@/types/user';
import { IsNotEmpty } from 'class-validator';
type IinterviewAs = 'interviewee' | 'interviewer';
// type INewUser = Pick<IDev, 'address' | ''>
export class CreateDeveloperDto implements IDev {
  name: string;
  user: IDev;
  @IsNotEmpty({
    message: 'please enter your address',
  })
  address: string;
  @IsNotEmpty({
    message: 'please enter your phone number',
  })
  phone_number: string;
  @IsNotEmpty({
    message: 'please enter your skills',
  })
  skills?: string[];
  @IsNotEmpty({
    message: 'please enter your years of experience',
  })
  years_of_experience: number;
  role_status: 'InHouse' | 'Pending' | 'Interview' | 'External';
  roles: IRole;
  //   user: IUser;
}
