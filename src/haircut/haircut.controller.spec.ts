import { Test, TestingModule } from '@nestjs/testing';
import { HaircutController } from './haircut.controller';

describe('HaircutController', () => {
  let controller: HaircutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HaircutController],
    }).compile();

    controller = module.get<HaircutController>(HaircutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
