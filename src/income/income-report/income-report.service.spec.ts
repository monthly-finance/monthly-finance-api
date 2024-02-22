import { Test, TestingModule } from '@nestjs/testing';
import { IncomeReportService } from './income-report.service';

describe('IncomeReportService', () => {
  let service: IncomeReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeReportService],
    }).compile();

    service = module.get<IncomeReportService>(IncomeReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
