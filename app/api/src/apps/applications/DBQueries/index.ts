import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import { Application } from '../entities/application.entity';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { IApplication } from '@/types/application';
import { IDeveloper } from '@/types/developer';

export async function createApplication(
  roleId: number,
  applicationData: IApplication,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const applicationRepo = transaction.getRepository(
    dependencies.db.models.application,
  );
  const role = transaction.getRepository(dependencies.db.models.role);
  const developer = transaction.getRepository(dependencies.db.models.developer);
  const exstingrole = await role.findOne({
    where: {
      id: roleId,
    },
    relations: ['application'],
  });
  let developerData = await developer.create({
    ...applicationData.developer,
  });
  const { developer: anything, ...rest } = applicationData;
  let dev = await developer.save(developerData);
  let newApplication = await applicationRepo.create({
    ...exstingrole,
    ...rest,
    // background_questions, cover_letter, id, resume, status, years_of_experience
    developer: dev,
  });
  let data = await applicationRepo.save(newApplication);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}

export function getApplicationById(
  id: number,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return myDataSource.manager
    .getRepository(dependencies.db.models.application)
    .findOne({
      where: { id },
    });
}

export default {
  createApplication,
  getApplicationById,
};
