import { Test, TestingModule } from '@nestjs/testing';
import { HaircutService } from './haircut.service';

describe('HaircutService', () => {
  let service: HaircutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HaircutService],
    }).compile();

    service = module.get<HaircutService>(HaircutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
