// Import necessary modules from TypeORM
import { UserEntity as User } from '../../auth/models/user.entity';
import AssociableModel from '../../../Config/associable';
import { Application } from '../../applications/entities/application.entity';
import { ClockHours } from '../../clocked-hours/entities/clocked-hour.entity';
import { Interview } from '../../interviews/entities/interview.entity';
import { Role } from '../../roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import uuid from '../../../util/uuid';
@Entity('developer')
export class Developer extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid.makeUuid();

  @ManyToOne((type) => User, (user) => user.developer)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column('simple-json')
  skills: string[];
  @Column()
  phone_number: string;
  @Column()
  years_of_experience: string;
  @Column()
  address: string;
  @Column({ default: 'External' })
  role_status: 'InHouse' | 'Pending' | 'Accepted' | 'External';
  @ManyToOne((type) => Role, (role) => role.developers)
  @JoinColumn({ name: 'developer_id' })
  roles: Role;
  @OneToMany((type) => Interview, (interview) => interview.interviewer)
  interviewsAsInterviewer: Interview[];

  @OneToMany((type) => Interview, (interview) => interview.interviewee)
  interviewsAsInterviewee: Interview[];

  @OneToMany((type) => ClockHours, (clockHours) => clockHours.developer)
  clockHours: ClockHours[];

  // @OneToMany((type) => Application, (application) => application.developer)
  // applications: Application[];
}
