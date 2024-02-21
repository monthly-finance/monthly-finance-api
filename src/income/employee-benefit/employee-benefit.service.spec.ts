import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBenefitService } from './employee-benefit.service';

describe('EmployeeBenefitService', () => {
  let service: EmployeeBenefitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeBenefitService],
    }).compile();

    service = module.get<EmployeeBenefitService>(EmployeeBenefitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
