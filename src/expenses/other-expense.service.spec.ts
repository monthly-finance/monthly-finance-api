import { Test, TestingModule } from '@nestjs/testing';
import { OtherExpenseService } from './other-expense.service';

describe('OtherExpenseService', () => {
  let service: OtherExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherExpenseService],
    }).compile();

    service = module.get<OtherExpenseService>(OtherExpenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
