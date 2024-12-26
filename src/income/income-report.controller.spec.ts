import { Test, TestingModule } from '@nestjs/testing';
import { IncomeReportController } from './income-report.controller';

describe('IncomeReportController', () => {
  let controller: IncomeReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeReportController],
    }).compile();

    controller = module.get<IncomeReportController>(IncomeReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
