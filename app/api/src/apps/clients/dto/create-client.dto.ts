import { IClient } from '@/types/client';

export class CreateClientDto implements IClient {
  contact_person: string;
  description: string;
  email: string;
  id: number;
  industry: string;
  name: string;
  phone_number: string;
  role?: Record<any, any>;
}
