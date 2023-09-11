import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthtokenEntity } from './Token/authToken.entity';
import { CredentialTokenEntity } from './CredentialToken/credentialToken.entity';
import AssociableModel from '../../Config/associable';

@Entity('user')
export class UserEntity extends AssociableModel {
  @Column({ nullable: false, primary: true })
  email: string;

  @Column({ default: '' })
  firstName: string;
  @Column({ default: '' })
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  lockReason: string;
  @Column({ nullable: true, default: null })
  role: 'Ceo' | 'Developer' | 'Marketing' | 'HR';

  @OneToMany(() => AuthtokenEntity, (IAuthToken) => IAuthToken.user, {
    onDelete: 'CASCADE',
  })
  authToken: AuthtokenEntity[];
  @OneToMany(() => CredentialTokenEntity, (credential) => credential.user)
  credentials: CredentialTokenEntity;
}
