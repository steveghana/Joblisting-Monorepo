export type IUser = {
  id?: string;
  email: string;
  password?: string;
  role: IProfession;
  avatar?: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  address?: string;
};
export type IProfession =
  | 'Ceo'
  | 'Marketing'
  | 'Recruitment'
  | 'Developer'
  | 'CTO';
