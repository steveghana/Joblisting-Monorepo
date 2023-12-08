import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import { UserEntity } from '../models/user.entity';
import { DeepPartial, EntityManager, In, ObjectLiteral } from 'typeorm';
import { ensureTransaction, useTransaction } from '../../../Config/transaction';
import { IUser } from '../../../types/user';
export async function findOrCreateUser(
  email: string,
  defaults: IUser,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<[UserEntity, boolean]> {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ensureTransaction(
    transaction,
    async (transaction) => {
      const userRepo = transaction.getRepository(dependencies.db.models.user);
      const existingUser = (await userRepo.findOne({
        where: { email: email.toLowerCase() },
      })) as unknown as UserEntity;
      if (existingUser) {
        return [existingUser, false];
      }
      const newUser = (await userRepo.create({
        ...defaults,
      })) as unknown as UserEntity;
      await userRepo.save(newUser);
      return [newUser, true];
    },
    dependencies,
  );
}

// We are using findElseCreateUser instead of findOrCreateUser , since findOrCreateUser logs values openly
// Temp solution. Waiting for issue https://github.com/sequelize/sequelize/issues/14266 to be resolved
export function findElseCreateUser(
  email: string,
  user: IUser,
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<[UserEntity, boolean]> {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return ensureTransaction(
    transactionParam,
    async (transaction) => {
      const userRepo = transaction.getRepository(dependencies.db.models.user);
      const existingUser = (await userRepo.findOne({
        where: { email: email.toLowerCase() },
      })) as unknown as UserEntity;
      if (existingUser) {
        return [existingUser, false];
      }
      console.log(existingUser);
      const newUser = userRepo.create({ ...user });
      let data = (await userRepo.save(newUser)) as UserEntity;
      return [data, true];
    },
    dependencies,
  );
}

export async function getUser(
  email: string,

  dependencies: Dependencies = null,
): Promise<UserEntity> {
  dependencies = injectDependencies(dependencies, ['db']);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useTransaction(async (transaction) => {
    const userRepo = transaction.getRepository(dependencies.db.models.user);
    // console.log(email, 'from user db queries');
    let user = (await userRepo.findOne({
      where: {
        email: email.toLowerCase(),
      },
    })) as unknown as UserEntity;
    return user;
  }, dependencies);
}

export function getUsers(
  emails: string[],
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<UserEntity[]> {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  return userRepo.find({
    where: {
      email: In([emails]),
    },
  }) as any;
}

export async function createUsers(
  users: (Partial<IUser> & { email: string })[],
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<void> {
  dependencies = injectDependencies(dependencies, ['db']);
  const userRepository = transaction.getRepository(UserEntity);
  await userRepository.insert(users);
}

export async function updateUser(
  user: Partial<IUser>,
  transaction: EntityManager,
  dependencies: Dependencies = null,
): Promise<any> {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  const done = await userRepo.update(
    { email: user?.email.trim().toLowerCase() },
    {
      ...user,
    },
  );
  return done;
}
export async function deletUser(
  user: Pick<IUser, 'email' | 'id'>,
  transaction: EntityManager,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);

  const { email, id } = user;
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  const done = await userRepo.delete({ id, email });
  return done;
}
export default {
  findOrCreateUser,
  findElseCreateUser,
  getUser,
  getUsers,
  createUsers,
  updateUser,
};
