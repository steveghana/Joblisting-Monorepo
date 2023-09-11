import { AuthtokenEntity as authToken } from '../auth/models/Token/authToken.entity';
import { CredentialTokenEntity as credentialToken } from '../auth/models/CredentialToken/credentialToken.entity';
import { UserEntity as user } from '../auth/models/user.entity';
import { DataSource, Repository } from 'typeorm';

type RepositoryType<T> = Repository<T>;
export type Repositories = {
  authToken: RepositoryType<authToken>;
  user: RepositoryType<user>;
  credentialToken: RepositoryType<credentialToken>;
};

export function createRepositories(
  entities: any[],
  myDataSource: DataSource,
): Repositories {
  return entities.reduce((acc, entity) => {
    const name = entity.name.toLowerCase();
    acc[name] = myDataSource.getRepository(entity);
    return acc;
  }, {} as Repositories);
}
export const EntitiesRepositoryMap = {
  authToken,
  credentialToken,
  user,
};

const Entities = [authToken, credentialToken, user];

// export { repositories };
export default Entities;
