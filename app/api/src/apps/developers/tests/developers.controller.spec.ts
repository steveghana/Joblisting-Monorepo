import { Test, TestingModule } from '@nestjs/testing';
import { DevelopersController } from '../controllers/developers.controller';
import { DevelopersService } from '../services/developers.service';

describe('DevelopersController', () => {
  let controller: DevelopersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevelopersController],
      providers: [DevelopersService],
    }).compile();

    controller = module.get<DevelopersController>(DevelopersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
