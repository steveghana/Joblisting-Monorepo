import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { Iinterviews } from '@/types/interviews';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function scheduleInterview(
  interviewData: Omit<Iinterviews, 'interviewer' | 'interviewee' | 'role'> & {
    candidateId: string;
    interviewerId: string;
  },
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  const interviewRepo = transaction.getRepository(
    dependencies.db.models.interviews,
  );

  const devRepo = transaction.getRepository(dependencies.db.models.developer);

  const candidate = await devRepo.findOne({
    where: { id: interviewData.candidateId },
  });
  const interviewer = await devRepo.findOne({
    where: { id: interviewData.interviewerId },
  });
  if (!candidate || !interviewer) {
    throw new HttpException(
      'Couldnt Schedule interview, check if Candidate or Developer Exists',
      HttpStatus.BAD_REQUEST,
    );
  }
  // const exstingrole = await role.findOne({
  //   where: {
  //     id: roleId,
  //   },
  //   relations: ['client'],
  // });
  let newInterview = await interviewRepo.create({
    // ...exstingrole,
    interviewer,
    candidate,
    scheduled_date: interviewData.scheduled_date,
    status: interviewData.status,
  });
  let data = await interviewRepo.save(newInterview);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
}

export function getApplicationById(
  id: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  return myDataSource.manager
    .getRepository(dependencies.db.models.interviews)
    .findOne({
      where: { id },
    });
}

export default {
  scheduleInterview,
  getApplicationById,
};
