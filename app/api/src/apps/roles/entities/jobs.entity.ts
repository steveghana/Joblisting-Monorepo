import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity'; // Import the Role entity
import AssociableModel from '../../../Config/associable';
import uuid from '../../../util/uuid';

@Entity('jobs')
export class Job extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid.makeUuid();

  @ManyToOne(() => Role, (role) => role.jobs)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  description: string;
  @Column({ default: 'Remote' })
  roleType: string;
  @Column()
  whenToStart: string;
  @Column()
  employmentType: string;
  @Column('simple-json')
  selectedSkills: string[];
  //   @Column()
  //   joblocation: string;
  @Column()
  roleName: string;

  @Column()
  jobType: string;

  @Column()
  salary: string;

  @Column('simple-json')
  tasks: string[];

  @Column()
  roleCategory: string;

  @Column()
  postedDate: Date;
}
