export type IUser = {
  id?: string;
  email: string;
  password?: string;
  names?: Record<string, any>[];
  photos?: Record<string, any>[];
  emailAddresses?: any[];
  googleVerified?: boolean;
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
