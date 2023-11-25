// Client Entity
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
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  @Column()
  companyLogo: string;
  @Column()
  aboutTheCompany: string;
  @Column('simple-array')
  country: Record<string, any>;

  @Column('simple-array')
  industry: [string];

  @Column({ nullable: true })
  avatar?: string;
  @Column()
  communicationPreferences: string;
  @Column()
  phoneNumber: string;
  @Column()
  companyName: string;

  @Column()
  email: string;
  @Column()
  numOfEmployees: string;

  @Column()
  projectTitle: string;
  @Column({ nullable: true })
  startDate: Date;
  // Define the association with Roles
  @OneToMany((type) => Role, (role) => role.client)
  roles: Role[];
}
