// Import necessary modules from TypeORM
import AssociableModel from '../../../Config/associable';
import { Developer } from '../../developers/entities/developer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
// ClockHours Entity
@Entity('clock_hours')
export class ClockHours extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Developer, (developer) => developer.clockHours)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @Column()
  date: Date;

  @Column()
  hours_worked: number;
}
