import { Test, TestingModule } from '@nestjs/testing';
import { BolumService } from './bolum.service';

describe('BolumService', () => {
  let service: BolumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BolumService],
    }).compile();

    service = module.get<BolumService>(BolumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
