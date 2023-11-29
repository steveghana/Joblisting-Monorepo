import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AuthtokenEntity } from './Token/authToken.entity';
import { CredentialTokenEntity } from './CredentialToken/credentialToken.entity';
import AssociableModel from '../../../Config/associable';
// import { Role } from '../../enums/role.enum';
import uuid from '../../../util/uuid';
import { Developer } from '../../developers/entities/developer.entity';
export type IProfession =
  | 'Ceo'
  | 'Marketing'
  | 'Recruitment'
  | 'Developer'
  | 'CTO';

@Entity('user')
export class UserEntity extends AssociableModel {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid.makeUuid();

  @Column({ default: '' })
  firstName: string;
  @Column({ default: '' })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    /* type: 'enum', enum: Role, default: Role.USER */
  })
  role: IProfession;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => AuthtokenEntity, (IAuthToken) => IAuthToken.user, {
    onDelete: 'CASCADE',
  })
  authToken: AuthtokenEntity[];
  @OneToMany(() => CredentialTokenEntity, (credential) => credential.user)
  credentials: CredentialTokenEntity;
  @OneToOne((type) => Developer, (developer) => developer.user, {
    cascade: true,
  })
  developer: Developer;
}
