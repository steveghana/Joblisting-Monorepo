import { ClockHours } from '@/apps/clocked-hours/entities/clocked-hour.entity';
import { Interview } from '@/apps/interviews/entities/interview.entity';
import { IDev } from '@/types/developer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  Matches,
  MaxLength,
  MinLength,
  isNumber,
} from 'class-validator';
import { IRole } from '@/types/role';
import { IUser } from '@/types/user';
type IinterviewAs = 'interviewee' | 'interviewer';
// type INewUser = Pick<IDev, 'address' | ''>
export class CreateDeveloperDto implements IDev {
  name: string;
  user: IUser;
  @IsNotEmpty({
    message: 'please enter your address',
  })
  address: string;
  @IsNotEmpty({
    message: 'please enter your years of experience',
  })
  @IsNotEmpty({
    message: 'role is required',
  })
  @IsNumber()
  roleId: number;
  @IsNotEmpty({
    message: 'role is required',
  })
  @IsString()
  @IsNotEmpty({
    message: 'please enter your phone number',
  })
  phone_number: string;

  @IsNotEmpty({
    message: 'skills is required',
  })
  @IsNotEmpty()
  @IsArray()
  skills: string[];
  @IsString()
  email: string;

  @IsString()
  years_of_experience: string;
  role_status: 'InHouse' | 'Pending' | 'External' | 'Accepted';
  roles: IRole;
  //   user: IUser;
}
