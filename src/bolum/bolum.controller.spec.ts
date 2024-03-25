import { Test, TestingModule } from '@nestjs/testing';
import { BolumController } from './bolum.controller';
import { BolumService } from './bolum.service';

describe('BolumController', () => {
  let controller: BolumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BolumController],
      providers: [BolumService],
    }).compile();

    controller = module.get<BolumController>(BolumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
