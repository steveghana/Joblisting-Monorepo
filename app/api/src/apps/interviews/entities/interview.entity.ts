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
import uuid from '../../../util/uuid';
@Entity('interviews')
export class Interview extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid.makeUuid();

  @ManyToOne((type) => Role, (role) => role.interviews)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne((type) => Developer, (developer) => developer.interviewer)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer: Developer;

  @ManyToOne((type) => Developer, (developer) => developer.candidate)
  @JoinColumn({ name: 'interviewee_id' })
  candidate: Developer;

  @Column()
  scheduled_date: Date;

  @Column()
  status: 'Scheduled' | 'Completed' | 'Canceled'; // Scheduled, Completed, Canceled
}
