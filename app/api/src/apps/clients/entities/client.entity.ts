// Client Entity
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  industry: string;

  @Column()
  contact_person: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  // Define the association with Roles
  @OneToMany((type) => Role, (role) => role.client)
  roles: Role[];
}
