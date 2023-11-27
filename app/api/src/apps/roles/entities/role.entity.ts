import AssociableModel from '../../../Config/associable';
import { Application } from '../../applications/entities/application.entity';
import { Client } from '../../clients/entities/client.entity';
import { Developer } from '../../developers/entities/developer.entity';
import { Interview } from '../../interviews/entities/interview.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Job } from './jobs.entity';
// Role Entity
@Entity('roles')
export class Role extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Client, (client) => client.roles)
  @JoinColumn({ name: 'client_id' })
  client: Client;
  @OneToMany(() => Job, (job) => job.role)
  jobs: Job[];

  @ManyToOne((type) => Developer, (developer) => developer.roles)
  @JoinColumn({ name: 'developer_id' })
  developers: Developer[];

  @Column()
  title: string;

  @Column()
  devsNeeded: string;
  @Column()
  methodology: string;
  @Column()
  aboutTheProject: string;
  @Column()
  experience: string;
  @Column()
  communicationPreferences: string;

  @Column('simple-json')
  selectedSkills: string[]; // Store skills as JSON

  @Column()
  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  @OneToMany((type) => Interview, (interview) => interview.role)
  interviews: Interview[];

  @OneToMany((type) => Application, (application) => application.role)
  application: Application[];
}
