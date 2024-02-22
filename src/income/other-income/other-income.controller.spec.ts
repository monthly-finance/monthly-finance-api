import { Test, TestingModule } from '@nestjs/testing';
import { OtherIncomeController } from './other-income.controller';

describe('OtherIncomeController', () => {
  let controller: OtherIncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherIncomeController],
    }).compile();

    controller = module.get<OtherIncomeController>(OtherIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
