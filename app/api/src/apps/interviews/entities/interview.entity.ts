// Import necessary modules from TypeORM
import AssociableModel from '../../../Config/associable';
import { Developer } from '../../developers/entities/developer.entity';
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
// Interview Entity
@Entity('interviews')
export class Interview extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Role, (role) => role.interviews)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(
    (type) => Developer,
    (developer) => developer.interviewsAsInterviewer,
  )
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: Developer;

  @ManyToOne(
    (type) => Developer,
    (developer) => developer.interviewsAsInterviewee,
  )
  @JoinColumn({ name: 'interviewee_id' })
  interviewee: Developer;

  @Column()
  scheduled_date: Date;

  @Column()
  status: 'Scheduled' | 'Completed' | 'Canceled'; // Scheduled, Completed, Canceled
}
