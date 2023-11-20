import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ClientsController', () => {
  let app: INestApplication;
  let controller: ClientsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService],
    }).compile();

    app = module.createNestApplication();
    controller = module.get<ClientsController>(ClientsController);
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
    expect(response.body).toBeDefined(); // Check if the response body is defined
  });
  it('/client (POST)', async () => {
    const createClientDto = {
      'Client info': {
        name: 'Test Client',
        email: 'test@example.com',
        industry: ['IT'],
        someDummyproperty: '1-10',
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

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //  expect(response.body).toBeDefined(); // Check if the response body is defined
  });
  it('/client (GET)', async () => {
    // Test the GET endpoint
    const response = await request(app.getHttpServer()).get('/client');

    expect(response.status).toBe(HttpStatus.OK);
    // Add more assertions based on the expected behavior of your API
  });

  it('/client/:id (GET)', async () => {
    // Test the GET by ID endpoint
    const id = 1; // Replace with a valid ID
    const response = await request(app.getHttpServer()).get(`/client/${id}`);

    expect(response.status).toBe(HttpStatus.OK);
    // Add more assertions based on the expected behavior of your API
  });

  it('/client/:id (PATCH)', async () => {
    // Test the PATCH endpoint
    const id = 1; // Replace with a valid ID
    const updateData = {
      // Replace with the data you want to update
    };

    const response = await request(app.getHttpServer())
      .patch(`/client/${id}`)
      .send(updateData);

    expect(response.status).toBe(HttpStatus.OK);
    // Add more assertions based on the expected behavior of your API
  });

  it('/client/:id (DELETE)', async () => {
    // Test the DELETE endpoint
    const id = 1; // Replace with a valid ID
    const response = await request(app.getHttpServer()).delete(`/client/${id}`);

    expect(response.status).toBe(HttpStatus.OK);
    // Add more assertions based on the expected behavior of your API
  });

  afterEach(async () => {
    await app.close();
  });
});
