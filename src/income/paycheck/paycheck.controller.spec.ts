import { Test, TestingModule } from '@nestjs/testing';
import { PaycheckController } from './paycheck.controller';

describe('PaycheckController', () => {
  let controller: PaycheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaycheckController],
    }).compile();

    controller = module.get<PaycheckController>(PaycheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
