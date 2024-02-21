import { Test, TestingModule } from '@nestjs/testing';
import { OtherIncomeService } from './other-income.service';

describe('OtherIncomeService', () => {
  let service: OtherIncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherIncomeService],
    }).compile();

    service = module.get<OtherIncomeService>(OtherIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
