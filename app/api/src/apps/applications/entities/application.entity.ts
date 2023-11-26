// Import necessary modules from TypeORM
import { Developer } from '../../developers/entities/developer.entity';
import { Role } from '../../roles/entities/role.entity';
import { IStatusApplication } from '../../../types/application';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import AssociableModel from '../../../Config/associable';

// Developer Entity

// Application Entity
@Entity('applications')
export class Application extends AssociableModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.application)
  @JoinColumn({ name: 'role_id' })
  role: Role;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phoneNumber: string;
  // @ManyToOne((type) => Developer, (developer) => developer.applications)
  // @JoinColumn({ name: 'developer_id' })
  // developer: Developer;
  @Column()
  years_of_experience: string;
  @Column()
  address: string;

  @Column({ type: 'simple-json', nullable: true })
  background_questions?: Record<string, string>; // Store background questions as JSON
  @Column({ type: 'simple-json', nullable: true })
  resume: Record<string, string>; // Store background questions as JSON

  @Column()
  coverLetter: string;

  @Column()
  status: IStatusApplication; // Submitted, Shortlisted, Rejected IStatusApplication
}

// You can create a Notifications entity similarly if needed
