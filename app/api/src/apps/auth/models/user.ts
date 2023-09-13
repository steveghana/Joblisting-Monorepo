export type IUser = {
  email?: string;
  password?: string;
  role?: string /* 'Ceo' | 'Developer' | 'Marketing' | 'HR'; */;
  firstName?: string;
  lastName?: string;
  // address?: string;
};
