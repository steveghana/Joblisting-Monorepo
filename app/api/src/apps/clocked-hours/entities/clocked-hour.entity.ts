// Import necessary modules from TypeORM
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
export class ClockHours {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Developer, (developer) => developer.clockHours)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @Column()
  date: Date;

  @Column()
  hours_worked: number;
}
