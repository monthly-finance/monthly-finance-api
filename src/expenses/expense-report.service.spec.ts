import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseReportService } from './expense-report.service';

describe('ExpensesService', () => {
  let service: ExpenseReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseReportService],
    }).compile();

    service = module.get<ExpenseReportService>(ExpenseReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
