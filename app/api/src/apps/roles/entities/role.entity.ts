import { Application } from '@/apps/applications/entities/application.entity';
import { Client } from '@/apps/clients/entities/client.entity';
import { Developer } from '@/apps/developers/entities/developer.entity';
import { Interview } from '@/apps/interviews/entities/interview.entity';
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

  @Column('simple-json')
  skills_required: string[]; // Store skills as JSON

  @Column()
  vacancy_status: 'Open' | 'Closed'; // Open, Closed

  @OneToMany((type) => Interview, (interview) => interview.role)
  interviews: Interview[];

  @OneToMany((type) => Application, (application) => application.role)
  application: Application[];
}
