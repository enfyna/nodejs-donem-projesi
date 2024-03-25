import { Test, TestingModule } from '@nestjs/testing';
import { OgrenciController } from './ogrenci.controller';
import { OgrenciService } from './ogrenci.service';

describe('OgrenciController', () => {
  let controller: OgrenciController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OgrenciController],
      providers: [OgrenciService],
    }).compile();

    controller = module.get<OgrenciController>(OgrenciController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
