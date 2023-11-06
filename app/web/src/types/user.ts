export interface IUser {
  token: string;
  role: string;
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
export type Iuser = { user: Omit<IUser, "token" | "role"> };
