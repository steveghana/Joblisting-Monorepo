import { IApplication } from '@/types/application';
import { IClient } from '@/types/client';
import { IRole } from '@/types/role';

export class CreateRoleDto implements IRole {
  application?: IApplication[];
  client: IClient;
  clientId?: number;
  description: string;
  // developer: any;
  id?: number;
  interviews?: any[];
  skills_required: string[];
  title: string;
  vacancy_status: 'Open' | 'Closed';
}
