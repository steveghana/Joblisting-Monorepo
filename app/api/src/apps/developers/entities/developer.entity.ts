// Import necessary modules from TypeORM
import { Application } from '@/apps/applications/entities/application.entity';
import { ClockHours } from '@/apps/clocked-hours/entities/clocked-hour.entity';
import { Interview } from '@/apps/interviews/entities/interview.entity';
import { Role } from '@/apps/roles/entities/role.entity';
import { User } from '@/apps/users/entity/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
@Entity('developers')
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.developer)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  address: string;

  @Column()
  role_status: 'InHouse' | 'Pending' | 'Interview' | 'External';

  // In House, Pending Interview, External

  @OneToMany((type) => Role, (role) => role.developer)
  roles: Role;
  // Define the associations with Interviews, ClockHours, and Applications
  @OneToMany((type) => Interview, (interview) => interview.interviewer)
  interviewsAsInterviewer: Interview[];

  @OneToMany((type) => Interview, (interview) => interview.interviewee)
  interviewsAsInterviewee: Interview[];

  @OneToMany((type) => ClockHours, (clockHours) => clockHours.developer)
  clockHours: ClockHours[];

  @OneToMany((type) => Application, (application) => application.developer)
  applications: Application[];
}
