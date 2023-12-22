import { IProfession } from './roles';

export interface IUser {
  id: string;
  token: string;
  role: IProfession;
  savedCards: number;
  firstName: string;
  lastName: string;
  coverImg: string;
  avatar: string;
  description: string;
  jobtitle: string;
  location: string;
  email: string;
  followers: string;
}
export type Iuser = { user: Omit<IUser, 'token' | 'role'> };
