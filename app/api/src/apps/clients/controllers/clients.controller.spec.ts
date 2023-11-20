import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ClientsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/client (POST)', async () => {
    const createClientDto = {
      'Client info': {
        name: 'Test Client',
        email: 'test@example.com',
        industry: ['IT'],
        numOfEmployees: '1-10',
        companyName: 'Test Company',
        description: 'Test Description',
        phoneNumber: '1234567890',
        projectTitle: 'Test Project',
        startDate: new Date(),
      },
      'Project Details': {
        selectedSkills: ['Node.js'],
        DevsNeeded: '3',
        methodology: 'agile',
        experience: 'entry',
        testingQA: 'automated_testing',
      },
      'Additional Data': {
        durationForEmployment: '1 to 4 weeks',
        whenToStart: 'Immediately',
        dataContent: 'Test Data',
      },
      'Communication Type': {
        communicationPreferences: 'email',
        employmentType: 'Contract',
      },
    };

    const response = await request(app.getHttpServer())
      .post('/client')
      .send(createClientDto);

    expect(response.status).toBe(HttpStatus.OK);
    // Add more assertions based on the expected behavior of your API
  });

  afterEach(async () => {
    await app.close();
  });
});
