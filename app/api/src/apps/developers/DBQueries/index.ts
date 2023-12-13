import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager, In } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IDev } from '@/types/developer';
import { ensureTransaction } from '../../../Config/transaction';

export async function enrollDev(
  devDataset: IDev,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const userRepo = transaction.getRepository(dependencies.db.models.user);
  const { user, ...rest } = devDataset;
  const newUser = await userRepo.create({
    ...user,
    role: 'Developer',
  });
  await userRepo.save(newUser);
  let dev = await devRepo.create({
    ...rest,
    user: newUser,
  });
  let devData = await devRepo.save(dev);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return devData as unknown as IDev;
}
export const getAllDevs = async (
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) => {
  dependencies = injectDependencies(dependencies, ['db']);

  // Fetch developers with roles, client, user, job, and guest interviews
  const developersWithInterviews = await transaction
    .getRepository(dependencies.db.models.developer)
    .createQueryBuilder('developer')
    .leftJoinAndSelect('developer.roles', 'roles')
    .leftJoinAndSelect('developer.client', 'client')
    .leftJoinAndSelect('developer.user', 'user')
    .leftJoinAndSelect('developer.job', 'job')
    .leftJoinAndSelect('developer.guestInterviews', 'interviewAsGuest')
    // .leftJoinAndSelect('developer.candidateInterview', 'candidate')// eager loading not working
    .getMany();

  // Fetch interviews with candidate and guests separately and update them based on the
  // developer ID candidate relation is not loading
  const interviews = await transaction
    .getRepository(dependencies.db.models.interviews)
    .find({
      where: {
        candidate: { id: In(developersWithInterviews.map((item) => item.id)) },
      },
      relations: ['candidate', 'guests'],
    });

  // Map interviews to developers based on developer ID
  const interviewsMap = interviews.reduce((acc, interview) => {
    const developerId = interview.candidate.id;
    if (!acc[developerId]) {
      acc[developerId] = [];
    }
    acc[developerId].push(interview);
    return acc;
  }, {});
  // Merge interviews into developersWithInterviews array
  const developersWithMergedInterviews = developersWithInterviews.map(
    (developer) => {
      const developerId = developer.id;
      const developerInterviews = interviewsMap[developerId] || [];
      // Ensure 'candidate' is an item, not an array
      const [candidateInterview] = developerInterviews.filter(
        (interview) => interview.candidate.id === developerId,
      );
      return { ...developer, interview: candidateInterview || null };
    },
  );

  return developersWithMergedInterviews;
};

export async function getDevById(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  console.log(id, 'dev id');
  const dev = await myDataSource.manager
    .getRepository(dependencies.db.models.developer)
    .findOne({
      where: { id },
      relations: [
        'clockHours',
        'roles',
        'user',
        'candidateInterview',
        'guestInterviews',
      ],
    });
  return dev as unknown as IDev;
}
export async function updateDev(
  id: string,
  updates: Partial<IDev>,
  transactionParam: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const applicationRepo = transactionParam.getRepository(
    dependencies.db.models.developer,
  );
  return await ensureTransaction(
    transactionParam,
    async (transaction) => {
      const data = await applicationRepo.update({ id }, { ...updates });
      return data;
    },
    dependencies,
  );
}
export async function deleteDev(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
): Promise<number> {
  dependencies = injectDependencies(dependencies, ['db']);
  const rolesRepo = transaction.getRepository(dependencies.db.models.developer);

  const { affected } = await rolesRepo.delete({
    id,
  });
  return affected;
}
export async function bulkdeleteDevs(
  id: string[],
  transaction: EntityManager,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const deleted = await Promise.all(
    devRepo.delete({
      id: In([id]),
    }) as any,
  );
  const { affected } = deleted[0];
  return affected;
}

export default {
  enrollDev,
  deleteDev,
  getAllDevs,
  updateDev,
  getDevById,
};
