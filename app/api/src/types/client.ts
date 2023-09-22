export interface IClient {
  id: number;

  name: string;

  description: string;

  industry: string;

  contact_person: string;

  email: string;

  phone_number: string;
  role?: Record<any, any>;
}
