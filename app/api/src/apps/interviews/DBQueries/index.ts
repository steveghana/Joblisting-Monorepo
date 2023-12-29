import {
  Dependencies,
  injectDependencies,
} from '../../../util/dependencyInjector';
import uuidUtil from '../../../util/uuid';
import { DeepPartial, EntityManager, In, QueryRunner } from 'typeorm';
import myDataSource from '../../../../db/data-source';
import uuid from '../../../util/uuid';
import { Iinterviews } from '@/types/interviews';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Interview } from '../entities/interview.entity';

// Import your actual interviews module
export async function scheduleInterview(
  interviewData: Partial<
    Omit<Iinterviews, 'guest' | 'interviewee' | 'role'> & {
      candidateId: string;
      guests: string[];
    }
  >,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const interviewRepo = transaction.getRepository(
    dependencies.db.models.interviews,
  );
  const { guests: guestIds, candidateId, ...rest } = interviewData;
  const devRepo = transaction.getRepository(dependencies.db.models.developer);
  const candidate = await devRepo.findOne({
    where: { id: candidateId },
    relations: ['candidateInterview'],
  });

  if (candidate.candidateInterview) {
    throw new HttpException(
      'Candidate already has an interview scheduled.',
      HttpStatus.BAD_REQUEST,
    );
  }

  const guests = await devRepo.find({ where: { id: In([...guestIds]) } });

  if (!guests) {
    throw new HttpException(
      'Could not schedule interview. Check if all Developers exist.',
      HttpStatus.BAD_REQUEST,
    );
  }

  const newInterview = await interviewRepo.create({
    candidate,
    guests: [...guests],
    ...rest,
  });
  const data = await interviewRepo.save(newInterview);

  return data;
}

export async function updateInterview(
  id: string,
  interviewData: Partial<
    Omit<Iinterviews, 'guest' | 'interviewee' | 'role'> & {
      candidateId: string;
      guests: string[];
    }
  >,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) {
  dependencies = injectDependencies(dependencies, ['db']);
  const interviewRepo = transaction.getRepository(
    dependencies.db.models.interviews,
  );
  const { guests: guestIds, candidateId, ...rest } = interviewData;
  const devRepo = transaction.getRepository(dependencies.db.models.developer);

  const candidate = await devRepo.findOne({
    where: { id: candidateId },
  });
  const guests = await devRepo.find({
    where: { id: In(guestIds) },
  });

  if (!candidate || guests.length !== interviewData.guests.length) {
    throw new HttpException(
      'Could not update interview. Check if Candidate or Developer(s) exist.',
      HttpStatus.BAD_REQUEST,
    );
  }

  // Load the existing interview
  const existingInterview = await interviewRepo.findOne({
    where: { id },
    relations: ['guests', 'candidate'],
  });

  if (!existingInterview) {
    throw new HttpException(
      'No scheduled interview found',
      HttpStatus.NOT_FOUND,
    );
  }

  // Update the properties manually
  existingInterview.guests = guests;
  existingInterview.candidate = candidate;
  for (const prop in rest) {
    existingInterview[prop] = rest[prop];
  }

  // Save the updated interview
  const updatedInterview = await interviewRepo.save(existingInterview);

  return updatedInterview;
}

export function getInterviewById(
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
      relations: ['guests', 'candidate'],
    });
}

export async function getAllInterviews(
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const interviewData = await myDataSource.manager
    .getRepository(dependencies.db.models.interviews)
    .createQueryBuilder('interviews')
    .leftJoinAndSelect('interviews.guests', 'guests')
    .leftJoinAndSelect('guests.user', 'guestuser')
    .addSelect(['guestuser.email']) // Select only the 'email' column from the 'user' table for guests
    .leftJoinAndSelect('interviews.candidate', 'candidate')
    .leftJoinAndSelect('candidate.user', 'candidateuser')
    .addSelect(['candidateuser.email']) // Select only the 'email' column from the 'user' table for the candidate
    .getMany();

  return interviewData;
}
export async function cancelInterview(
  interviewId: string,
  transaction: EntityManager = null,
  dependencies: Dependencies = null,
) /* : Promise<ICredentialToken> */ {
  dependencies = injectDependencies(dependencies, ['db']);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return

  const { affected } = await myDataSource.manager
    .getRepository(dependencies.db.models.interviews)
    .delete({ id: interviewId });
  return affected;
}

export default {
  scheduleInterview,
  getAllInterviews,
  getInterviewById,
};
