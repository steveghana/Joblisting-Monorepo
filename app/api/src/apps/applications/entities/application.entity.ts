// Import necessary modules from TypeORM
import { Developer } from '@/apps/developers/entities/developer.entity';
import { Role } from '@/apps/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

// Developer Entity

// Application Entity
@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Role, (role) => role.application)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne((type) => Developer, (developer) => developer.applications)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @Column()
  resume: string; // Store as file path or link

  @Column()
  years_of_experience: number;

  @Column('simple-json')
  background_questions: Record<string, string>; // Store background questions as JSON

  @Column()
  cover_letter: string;

  @Column()
  status: string; // Submitted, Shortlisted, Rejected
}

// You can create a Notifications entity similarly if needed
