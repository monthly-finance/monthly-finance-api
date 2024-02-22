import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeBenefitController } from './employee-benefit.controller';

describe('EmployeeBenefitController', () => {
  let controller: EmployeeBenefitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeBenefitController],
    }).compile();

    controller = module.get<EmployeeBenefitController>(EmployeeBenefitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
