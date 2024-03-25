import { Test, TestingModule } from '@nestjs/testing';
import { OgrenciService } from './ogrenci.service';

describe('OgrenciService', () => {
  let service: OgrenciService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OgrenciService],
    }).compile();

    service = module.get<OgrenciService>(OgrenciService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
