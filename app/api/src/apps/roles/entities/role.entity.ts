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
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Client, (client) => client.roles)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne((type) => Developer, (developer) => developer.roles)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @Column()
  title: string;

  @Column()
  description: string;
  @Column()
  durationForEmployment: string;
  @Column()
  DevsNeeded: string;
  @Column()
  methodology: string;
  @Column()
  experience: string;
  @Column()
  testingQA: string;
  @Column()
  whenToStart: string;
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
