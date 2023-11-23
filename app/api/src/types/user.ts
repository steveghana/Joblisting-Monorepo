export type IUser = {
  id?: string;
  email?: string;
  password?: string;
  // lockReason?: 'needs review';
  fullName?: string;
  address?: string;
};
export type IProfession = 'Ceo' | 'Marketing' | 'Recruitment' | 'Developer';
