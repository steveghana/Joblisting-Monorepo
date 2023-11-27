import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity'; // Import the Role entity
import AssociableModel from '@/Config/associable';

@Entity('jobs')
export class Job extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.jobs)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  description: string[];
  @Column({ default: 'Remote' })
  roleType: string;
  @Column()
  whenToStart: string;
  @Column()
  employmentType: string;
  //   @Column()
  //   joblocation: string;
  @Column()
  roleName: string;

  @Column()
  jobtype: string;

  @Column()
  salary: string;

  @Column('simple-json')
  tasks: string[];

  @Column()
  roleCategory: string;

  @Column()
  postedDate: Date;
}
