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
// Role Entity
@Entity('roles')
export class Role extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Client, (client) => client.roles)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne((type) => Developer, (developer) => developer.roles)
  @JoinColumn({ name: 'developer_id' })
  developers: Developer[];

  @Column()
  title: string;
  @Column()
  durationForEmployment: string;
  @Column()
  devsNeeded: string;
  @Column()
  methodology: string;
  @Column()
  aboutTheProject: string;
  @Column()
  experience: string;
  @Column()
  hiringRole: string;
  @Column({ default: 'Remote' })
  roleType: string;
  @Column()
  whenToStart: string;
  @Column()
  employmentType: string;
  @Column()
  dataContent: string;
  @Column()
  numOfEmployees: string;

  @Column('simple-json')
  skills_required: string[]; // Store skills as JSON

  @Column()
  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  @OneToMany((type) => Interview, (interview) => interview.role)
  interviews: Interview[];

  @OneToMany((type) => Application, (application) => application.role)
  application: Application[];
}
